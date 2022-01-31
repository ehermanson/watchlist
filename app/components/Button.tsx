import { styled } from "~/stitches.config";

export const Button = styled("button", {
  padding: "20px 15px",
  fontWeight: "bold",
  borderRadius: "6px",
  color: "$gray1",
  border: "3px solid $yellow",
  backgroundColor: "$yellow9",
  transition: "background-color .25s ease",
  "&:hover": {
    backgroundColor: "$yellow10",
  },
  "&:focus": {
    outline: 0,
    backgroundColor: "$yellow10",
  },
});
