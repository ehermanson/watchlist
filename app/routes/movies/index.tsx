import React from "react";
import {
  MetaFunction,
  LoaderFunction,
  Link,
  useCatch,
  useLoaderData,
  ActionFunction,
  useSubmit,
  useFetcher,
} from "remix";
import { getUserId, supabaseClient } from "~/lib/supabase.server";
import {
  Input,
  UnorderedList,
  ListItem,
  ListContent,
  Box,
  SearchResult,
} from "~/components";

export const meta: MetaFunction = () => {
  return {
    title: "Watchlist - My Movies",
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);

  if (!userId) throw new Response("Unauthorized", { status: 401 });

  const { data } = await supabaseClient
    .from("movies")
    .select("id, mediaId, title, watched")
    .eq("createdBy", userId)
    .order("watched", { ascending: true });

  return {
    movies: data,
  };
};

export let action: ActionFunction = async ({ request }) => {
  const userId = await getUserId(request);
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  switch (_action) {
    case "delete": {
      const { data, error } = await supabaseClient
        .from("movies")
        .delete()
        .match({ id: values.id, createdBy: userId });

      return { data, error };
    }

    case "toggleWatched": {
      const { watched, id } = values;

      if (typeof watched !== "string") {
        return { formError: `Form not submitted correctly.` };
      }

      const { data, error } = await supabaseClient
        .from("movies")
        .update({
          watched: watched === "true" ? false : true,
          lastUpdated: new Date().toISOString(),
        })
        .match({ id, createdBy: userId });

      return { data, error };
    }

    case "add": {
      const { data, error } = await supabaseClient
        .from("movies")
        .insert([
          { mediaId: values.mediaId, createdBy: userId, title: values.title },
        ])
        .single();

      return { data, error };
    }
  }

  return {};
};

export default function Movies() {
  const { movies } = useLoaderData();

  const submit = useSubmit();
  const search = useFetcher();

  function handleChange(event: React.FormEvent<HTMLFormElement>) {
    submit(event.currentTarget, { replace: true });
  }

  return (
    <Box css={{ p: "$6" }}>
      <h1>Movies</h1>

      <search.Form method="get" action="/media-search">
        <Box css={{ mt: "$6" }}>
          <input type="hidden" name="media" value="movie" />
          <Input
            label="Add new movie"
            type="text"
            name="title"
            min={2}
            required
            placeholder="Search by title"
            onChange={(event) => search.submit(event.target.form)}
          />
        </Box>
      </search.Form>

      {search?.data?.map((result: any) => {
        return (
          <SearchResult
            key={result.id}
            id={result.id}
            title={result.name}
            posterSrc={result.poster}
            year={result.year}
            overview={result.overview}
          />
        );
      })}

      {movies?.length > 0 && (
        <UnorderedList>
          {movies.map((movie) => {
            return (
              <ListItem key={movie.id}>
                <ListContent
                  watched={movie.watched}
                  onToggleChange={handleChange}
                  id={movie.id}
                  title={movie.title}
                  route={`/movies/${movie.mediaId}`}
                />
              </ListItem>
            );
          })}
        </UnorderedList>
      )}
    </Box>
  );
}

export function CatchBoundary() {
  let caught = useCatch();

  if (caught.status === 401) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>You must be logged in.</h1>
        <Link to="/login">Login</Link>
      </div>
    );
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
