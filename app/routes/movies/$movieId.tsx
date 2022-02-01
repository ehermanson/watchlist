import type { LoaderFunction, ActionFunction } from "remix";
import { useLoaderData, useCatch } from "remix";
import { useParams } from "react-router-dom";
import { supabaseClient, getUserId } from "~/lib/supabase.server";
import { Box, Hero, CastList } from "~/components";
import { tmdbClient } from "~/lib/moviedb-api";

export const loader: LoaderFunction = async ({ request, params }) => {
  const { movieId } = params;
  const userId = await getUserId(request);

  if (typeof movieId !== "string") {
    return { error: `Something went wrong.` };
  }

  const movie = await tmdbClient.get({ id: movieId });

  const { data, error } = await supabaseClient
    .from("movies")
    .select(
      `
      title,
      watched,
      lastUpdated
      )`
    )
    .match({ mediaId: movieId, createdBy: userId });

  return { data, movie, error };
};

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await getUserId(request);
  const formData = await request.formData();
  const { watched } = Object.fromEntries(formData);

  const { data, error } = await supabaseClient
    .from("movies")
    .update({
      watched: watched === "false" ? true : false,
      lastUpdated: new Date().toISOString(),
    })
    .match({ mediaId: params.movieId, createdBy: userId });

  return { data, error };
};

export default function MovieDetail() {
  let { movie, data } = useLoaderData();

  const backdrop = tmdbClient.getImage({
    id: movie?.backdrop_path,
    size: "w1280",
  });

  const getStudioLogo = () => {
    const path =
      movie.production_companies[0].logo_path ??
      movie.production_companies.find((p) => p.logo_path).logo_path;

    return path;
  };

  return (
    <>
      <Hero
        title={movie.title}
        backdrop={backdrop}
        watched={data[0]?.watched}
        poster={tmdbClient.getImage({ id: movie.poster_path, size: "w400" })}
        year={movie.release_date?.split("-")[0]}
        overview={movie.overview}
        studioLogo={tmdbClient.getImage({
          id: getStudioLogo(),
          size: "h50",
        })}
      />
      <Box css={{ p: "$5" }}>
        {movie.credits.cast && (
          <Box css={{ mb: "$10" }}>
            <Box as="h2" css={{ mb: "$4" }}>
              Cast
            </Box>
            <CastList castMembers={movie.credits.cast} />
          </Box>
        )}
        <h2>Recommendations</h2>
        <ul>
          {movie.recommendations.results.map((m) => {
            return <li key={m.id}>{m.title}</li>;
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
