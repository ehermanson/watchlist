import { Form } from "remix";
import { Box, Button } from ".";

interface HeroProps {
  backdrop: string;
  watched: boolean;
  poster: string;
  title: string;
  year: string;
  overview: string;
  studioLogo?: string;
  seasons?: any[];
  onList: boolean;
  id: string;
}

export const Hero = ({
  backdrop,
  watched,
  poster,
  title,
  year,
  overview,
  studioLogo,
  seasons,
  onList,
  id,
}: HeroProps) => {
  return (
    <Box
      css={{
        position: "relative",
        hight: "50vh",
        display: "flex",
        backgroundImage: `url('${backdrop}')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left bottom",
      }}
    >
      <Box
        css={{
          background: `linear-gradient(
            to bottom right,
            rgba(0, 0, 0, .8) 100px,
            rgba(0, 0, 0, 0.7) 100%
            )
          `,

          padding: "50px",
        }}
      >
        <Box
          css={{
            position: "absolute",
            top: 20,
            right: 20,
            display: "flex",
            gap: "$2",
          }}
        >
          {!onList ? (
            <Form method="post">
              <input type="hidden" name="id" value={id} />
              <input type="hidden" name="title" value={title} />
              <input type="hidden" name="_action" value="add" />
              <Button>Add to my list</Button>
            </Form>
          ) : (
            <Form method="post">
              <input type="hidden" name="watched" value={String(watched)} />
              <input type="hidden" name="_action" value="toggleWatched" />
              <Button>
                {watched ? "Mark as not watched" : "Mark as Watched"}
              </Button>
            </Form>
          )}
        </Box>
        <Box
          css={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "$10",
            alignItems: "center",
          }}
        >
          <Box
            as="img"
            src={poster}
            height={600}
            width={400}
            css={{
              borderRadius: 10,
              boxShadow: "1px 2px 5px rgba(0,0,0,.5)",
            }}
          />
          <Box>
            <Box
              as="h1"
              css={{
                mb: "$4",
                textShadow: "2px 2px 5px black",
                display: "flex",
                alignItems: "baseline",
              }}
            >
              {title}
              <Box
                as="span"
                css={{
                  color: "$gray11",
                  fontSize: ".75em",
                  ml: "$2",
                  fontWeight: "normal",
                }}
              >
                ({year})
              </Box>
            </Box>
            {studioLogo && (
              <Box css={{ mb: "$4" }}>
                <Box
                  as="img"
                  css={{
                    padding: "$1",
                    borderRadius: "2px",
                    filter: "grayscale(1) invert(1) brightness(200%)",
                  }}
                  src={studioLogo}
                />
              </Box>
            )}
            {seasons && (
              <Box css={{ mb: "$4" }}>
                {seasons.length} {seasons.length > 1 ? "seasons" : "season"}
              </Box>
            )}
            <Box css={{ color: "$gray11" }}>{overview}</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
