import { styled } from "~/stitches.config";
import { Box } from "./Box";

export const StyledInput = styled("input", {
  backgroundColor: "$gray5",
  border: "3px solid $yellow8",
  color: "$gray12",
  borderRadius: "12px ",
  width: "100%",
  minHeight: "50px",
  padding: "$4",
  transition: "border-color .25s ease",
  "&:hover": {
    borderColor: "$yellow9",
  },
  "&:focus": {
    outline: 0,
    borderColor: "$yellow9",
  },
});

export const Input = ({
  label,
  ...rest
}: {
  label: string;
  [key: string]: any;
}) => {
  return (
    <Box as="label" css={{ display: "block", width: "100%" }}>
      <Box css={{ marginBottom: "$1", fontWeight: "bold" }}>{label}:</Box>
      <StyledInput {...rest} />
    </Box>
  );
};
