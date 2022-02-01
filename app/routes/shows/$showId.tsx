import type { LoaderFunction, ActionFunction, MetaFunction } from "remix";
import { useLoaderData, useCatch } from "remix";
import { useParams } from "react-router-dom";
import { supabaseClient, getUserId } from "~/lib/supabase.server";
import { Hero, Box, CastList } from "~/components";
import { tmdbClient } from "~/lib/moviedb-api";

export const loader: LoaderFunction = async ({ request, params }) => {
  const { showId } = params;
  const userId = await getUserId(request);

  if (typeof showId !== "string") {
    return { error: `Something went wrong.` };
  }

  const show = await tmdbClient.get({ id: showId, media: "tv" });

  const { data, error } = await supabaseClient
    .from("shows")
    .select(
      `
      title,
      watched,
      lastUpdated
      )`
    )
    .match({ mediaId: showId, createdBy: userId });

  return { data, show, error };
};

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await getUserId(request);
  const formData = await request.formData();
  const { watched } = Object.fromEntries(formData);

  const { data, error } = await supabaseClient
    .from("shows")
    .update({
      watched: watched === "false" ? true : false,
      lastUpdated: new Date().toISOString(),
    })
    .match({ mediaId: params.showId, createdBy: userId });

  return { data, error };
};

export default function ShowDetail() {
  let { show, data } = useLoaderData();

  const backdrop = tmdbClient.getImage({
    id: show.backdrop_path,
    size: "w1280",
  });

  console.log(show.credits);

  return (
    <>
      <Hero
        title={show.name}
        backdrop={backdrop}
        watched={data[0]?.watched}
        poster={tmdbClient.getImage({ id: show.poster_path, size: "w400" })}
        year={show.first_air_date?.split("-")[0]}
        overview={show.overview}
        studioLogo={tmdbClient.getImage({
          id: show.networks[0].logo_path,
          size: "h50",
        })}
        seasons={show.seasons}
      />
      <Box css={{ p: "$5" }}>
        {show.credits.cast && (
          <Box css={{ mb: "$10" }}>
            <Box as="h2" css={{ mb: "$4" }}>
              Cast
            </Box>
            <CastList castMembers={show.credits.cast} />
          </Box>
        )}
        <h2>Recommendations</h2>
        <ul>
          {show.recommendations.results.map((s) => {
            return <li key={s.id}>{s.name}</li>;
          })}
        </ul>
      </Box>
    </>
  );
}

export function CatchBoundary() {
  let caught = useCatch();
  let params = useParams();
  switch (caught.status) {
    case 404: {
      return (
        <div className="error-container">List not found: {params.listId}</div>
      );
    }
    case 401: {
      return (
        <div className="error-container">
          Sorry, but {params.listId} is not your list.
        </div>
      );
    }
    default: {
      throw new Error(`Unhandled error: ${caught.status}`);
    }
  }
}
