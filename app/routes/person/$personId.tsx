import type { LoaderFunction } from "remix";
import { useLoaderData, Link } from "remix";
import { Box, Card } from "~/components";
import { tmdbClient } from "~/lib/moviedb-api.server";
import { getImage } from "~/lib/get-image";

export const loader: LoaderFunction = async ({ request, params }) => {
  const { personId } = params;

  if (typeof personId !== "string") {
    return { error: `Something went wrong.` };
  }

  const person = await tmdbClient.getPerson({ id: personId });

  return { person };
};

export default function PersonDetail() {
  let { person } = useLoaderData();

  const bio = person.biography.split("\n");

  const actingCredits = person.combined_credits?.cast.sort((a, b) => {
    return a.popularity < b.popularity ? 1 : -1;
  });

  return (
    <Box css={{ p: "$4" }}>
      <Box css={{ display: "grid", gridTemplateColumns: "1fr 3fr" }}>
        <Box>
          <img
            src={getImage({
              id: person.profile_path,
              size: "w300",
            })}
          />
        </Box>
        <Box>
          <h1>{person.name}</h1>
          {bio.map((p: string) => (
            <Box as="p" css={{ mb: "$2" }}>
              {p}
            </Box>
          ))}
          <Box as="h2" css={{ mb: "$4" }}>
            Credits
          </Box>
          <Box
            css={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: "$8",
            }}
          >
            {actingCredits?.map((credit) => {
              if (credit.poster_path === null) {
                return;
              }
              const route = credit.media_type === "movie" ? "movies" : "shows";
              return (
                <Box
                  as="li"
                  css={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    css={{ textDecoration: "none" }}
                    as={Link}
                    to={`/${route}/${credit.id}`}
                  >
                    <Card
                      css={{ width: "100%" }}
                      title={
                        <Box>
                          <Box
                            css={{
                              fontWeight: "bold",
                              mb: "$1",
                              whiteSpace: "nowrap",
                              maxWidth: "200px",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              margin: "auto",
                            }}
                          >
                            {credit.title || credit.name}
                          </Box>
                          <Box css={{ color: "$gray9" }}>
                            {credit.character}
                          </Box>
                        </Box>
                      }
                      imageSrc={getImage({
                        id: credit.poster_path,
                        size: "w200",
                      })}
                    />
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
