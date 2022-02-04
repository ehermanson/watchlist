import { ReactNode } from "react";
import { Box } from ".";
interface CardProps {
  title: ReactNode;
  imageSrc: string;
  [prop: string]: any;
}

export const Card = ({ imageSrc, title, ...props }: CardProps) => {
  return (
    <Box
      {...props}
      css={{
        background: "$gray7",
        textAlign: "center",
        display: "inline-flex",
        flexDirection: "column",
        borderRadius: 10,
        boxShadow: "0 2px 4px #000",
        ...props.css,
      }}
    >
      <Box
        as="img"
        css={{
          borderRadius: "8px 8px 0 0",
        }}
        src={imageSrc}
      />
      <Box
        css={{
          p: "$2",
          flexGrow: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {title}
      </Box>
    </Box>
  );
};
