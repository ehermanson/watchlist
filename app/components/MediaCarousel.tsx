import { Card, Carousel } from ".";
import { tmdbClient } from "~/lib/moviedb-api";
import { Link } from "remix";
interface MediaItem {
  backdrop_path: string;
  title?: string;
  name?: string;
  id: string;
}

interface MediaCarouselProps {
  items: MediaItem[];
  mediaType: string;
}

export const MediaCarousel = ({ items, mediaType }: MediaCarouselProps) => {
  return (
    <Carousel>
      {items.map((item) => {
        return (
          <Link to={`/${mediaType}/${item.id}`} key={item.id}>
            <Card
              as="li"
              title={item.title || item.name || ""}
              css={{ scrollSnapAlign: "start", minWidth: 400 }}
              imageSrc={tmdbClient.getImage({
                id: item.backdrop_path,
                size: "w400",
              })}
            />
          </Link>
        );
      })}
    </Carousel>
  );
};
