import { Carousel, Card } from ".";
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
    <Carousel>
      {castMembers.map((member) => {
        if (member.profile_path === null) {
          // you are a nobody
          return;
        }

        return (
          <Card
            key={member.id}
            css={{ minWidth: 175 }}
            title={member.name}
            imageSrc={tmdbClient.getImage({
              id: member.profile_path,
              size: "w200",
            })}
          />
        );
      })}
    </Carousel>
  );
};
