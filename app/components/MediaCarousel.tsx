import { Card, Carousel, Box } from ".";
import { getImage } from "~/lib/get-image";
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
          <Box
            css={{ textDecoration: "none" }}
            as={Link}
            to={`/${mediaType}/${item.id}`}
            key={item.id}
          >
            <Card
              css={{ minWidth: 400, textDecoration: "none" }}
              title={item.title || item.name || ""}
              imageSrc={getImage({
                id: item.backdrop_path,
                size: "w400",
              })}
            />
          </Box>
        );
      })}
    </Carousel>
  );
};
