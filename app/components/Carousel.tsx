/**
 * Poor man's carousel
 */
import React, { ReactNode } from "react";
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
        padding: "$2 0 $4 0",
        gap: "$4",
        overflowX: "scroll",
        scrollSnapType: "x mandatory",
        display: "flex",
        "&::-webkit-scrollbar": {
          width: "10px",
          height: "10px",
        },

        "&::-webkit-scrollbar-thumb": {
          background: "linear-gradient(180deg, $yellow9, $yellow8, $yellow5)",
          borderRadius: "50vw",
        },

        "&::-webkit-scrollbar-track": {
          borderRadius: "50vw",
          background: "linear-gradient(180deg, $gray8, $gray3, $gray1)",
        },
      }}
    >
      {React.Children.map(children, (child) => {
        return React.isValidElement(child) ? (
          <Box as="li" css={{ scrollSnapAlign: "start", listStyle: "none" }}>
            {child}
          </Box>
        ) : null;
      })}
    </Box>
  );
};
