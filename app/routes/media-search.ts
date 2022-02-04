import { LoaderFunction } from "remix";
import { tmdbClient } from "~/lib/moviedb-api.server";
import { getImage } from "~/lib/get-image";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const search = await tmdbClient.search({
    query: url.searchParams.get("title") as string,
    media: url.searchParams.get("media") as "movie" | "tv",
  });

  if (!search.results) {
    return [];
  }

  return search?.results?.map((result: any) => {
    const release = result.first_air_date || result.release_date;

    return {
      name: result.name || result.title,
      id: result.id,
      overview: result.overview,
      poster: result.poster_path
        ? getImage({ id: result.poster_path, size: "w500" })
        : null,
      year: release?.split("-")[0],
    };
  });
};
