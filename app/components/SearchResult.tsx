import { Box, Button } from ".";
import { useFetcher } from "remix";

interface Props {
  id: string;
  title: string;
  posterSrc: string;
  overview: string;
  year: string;
}

export const SearchResult = ({
  id,
  title,
  posterSrc,
  overview,
  year,
}: Props) => {
  const fetcher = useFetcher();

  const isAdding =
    fetcher.submission && fetcher.submission.formData.get("mediaId") == id;

  return (
    <Box css={{ p: "$4", borderBottom: "1px solid $gray9" }}>
      <fetcher.Form method="post">
        <input type="hidden" name="mediaId" value={id} />
        <input type="hidden" name="title" value={title} />
        <Box
          css={{
            display: "grid",
            gridTemplateColumns: "100px 1fr 120px",
            gap: "$4",
            alignItems: "start",
          }}
        >
          {posterSrc ? (
            <Box as="img" src={posterSrc} css={{ width: 100 }} />
          ) : (
            <Box
              css={{ backgroundColor: "$gray8", width: 100, height: "100%" }}
            />
          )}
          <Box>
            <Box css={{ mb: "$2", fontWeight: "bold" }}>
              {title}{" "}
              {year && (
                <Box as="span" css={{ fontWeight: "normal", color: "$gray10" }}>
                  ({year})
                </Box>
              )}
            </Box>
            <Box css={{ color: "$gray11" }}>{overview}</Box>
          </Box>
          <Button name="_action" value="add">
            {isAdding ? "Adding..." : "Add To Watchlist"}
          </Button>
        </Box>
      </fetcher.Form>
    </Box>
  );
};
