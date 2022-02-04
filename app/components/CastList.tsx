import { Carousel, Card, Box } from ".";
import { getImage } from "~/lib/get-image";
import { Link } from "remix";
interface CastMember {
  profile_path: string;
  name: string;
  id: string;
  character: string;
}

interface CastListProps {
  castMembers: CastMember[];
}

export const CastList = ({ castMembers }: CastListProps) => {
  return (
    <Carousel>
      {castMembers.map((member) => {
        if (member.profile_path === null) {
          // you are a nobody
          return;
        }

        return (
          <Box
            css={{ textDecoration: "none" }}
            as={Link}
            to={`/person/${member.id}`}
          >
            <Card
              key={member.id}
              css={{ minWidth: 175 }}
              imageSrc={getImage({
                id: member.profile_path,
                size: "w200",
              })}
              title={
                <Box>
                  <Box
                    css={{
                      fontWeight: "bold",
                      mb: "$1",
                      whiteSpace: "nowrap",
                      maxWidth: "175px",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      margin: "auto",
                    }}
                  >
                    {member.name}
                  </Box>
                  <Box
                    css={{
                      color: "$gray9",
                      whiteSpace: "nowrap",
                      maxWidth: "175px",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      margin: "auto",
                    }}
                  >
                    {member.character}
                  </Box>
                </Box>
              }
            />
          </Box>
        );
      })}
    </Carousel>
  );
};
