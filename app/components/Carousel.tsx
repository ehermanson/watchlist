/**
 * Poor man's carousel
 */
import { ReactNode } from "react";
import { Box } from ".";

interface MediaCarouselProps {
  children: ReactNode;
}

export const Carousel = ({ children }: MediaCarouselProps) => {
  return (
    <Box
      as="ul"
      css={{
        margin: 0,
        padding: "$2 0",
        gap: "$4",
        overflowX: "scroll",
        scrollSnapType: "x mandatory",
        display: "flex",
        ["-webkit-overflow-scrolling"]: "touch",
      }}
    >
      {children}
    </Box>
  );
};
