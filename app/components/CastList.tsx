import { Box } from ".";
import { tmdbClient } from "~/lib/moviedb-api";
interface CastMember {
  profile_path: string;
  name: string;
  id: string;
}

interface CastListProps {
  castMembers: CastMember[];
}

export const CastList = ({ castMembers }: CastListProps) => {
  return (
    <Box
      as="ul"
      css={{
        margin: 0,
        padding: 0,
        gap: "$2",
        overflowX: "scroll",
        scrollSnapType: "x mandatory",
        display: "flex",
        ["-webkit-overflow-scrolling"]: "touch",
      }}
    >
      {castMembers.map((member) => {
        if (member.profile_path === null) {
          // you are a nobody
          return;
        }

        return (
          <Box
            key={member.id}
            as="li"
            css={{
              padding: "$1",
              background: "$gray4",
              textAlign: "center",
              display: "inline-flex",
              flexDirection: "column",
              borderRadius: 10,
              overflow: "hidden",
              minWidth: 175,
              boxShadow: ".5rem 1rem 3rem #000",
              scrollSnapAlign: "start",
            }}
          >
            <Box
              as="img"
              css={{
                borderRadius: 8,
              }}
              src={tmdbClient.getImage({
                id: member.profile_path,
                size: "w200",
              })}
            />
            <Box
              css={{
                p: "$1",
                flexGrow: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {member.name}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
