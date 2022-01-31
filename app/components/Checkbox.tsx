import { styled } from "~/stitches.config";
import { violet, blackA } from "@radix-ui/colors";
import { MdCheck } from "react-icons/md";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  all: "unset",
  backgroundColor: "$gray4",
  width: 24,
  height: 24,
  borderRadius: 4,
  border: "3px solid $yellow8",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "border-color .25s ease",
  "&:hover": {
    borderColor: "$yellow9",
    cursor: "pointer",
  },
  "&:focus": { borderColor: "$yellow9" },
  "&[data-state='checked']": {
    borderColor: "$yellow9",
    backgroundColor: "$yellow9",
  },
});

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
  color: "$gray1",
  display: "flex",
  alignItems: "center",
});

export const Checkbox = (props: any) => {
  return (
    <StyledCheckbox {...props}>
      <StyledIndicator>
        <MdCheck />
      </StyledIndicator>
    </StyledCheckbox>
  );
};
