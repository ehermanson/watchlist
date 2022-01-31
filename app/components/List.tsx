import { FormEvent } from "react";
import { Form, Link } from "remix";
import { styled } from "~/stitches.config";
import {
  Box,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipArrow,
  Checkbox,
} from "./";
import { MdDelete } from "react-icons/md";

export const UnorderedList = styled("ul", {
  margin: 0,
  padding: 0,
});

export const OrderedList = styled("ol", {
  margin: 0,
  padding: 0,
  listStyle: "none",
});

export const ListItem = styled("li", {
  padding: "$6 $2",
  listStyle: "none",
  display: "flex",
  width: "100%",
  gap: "$6",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid $gray7",
});

interface ListContentProps {
  watched: boolean;
  id: string;
  title: string;
  route: string;
  onToggleChange: (e: FormEvent<HTMLFormElement>) => void;
}

export const ListContent = ({
  watched,
  id,
  title,
  route,
  onToggleChange,
}: ListContentProps) => {
  return (
    <>
      <Form method="post" onChange={onToggleChange}>
        <input type="hidden" value={id} name="id" />
        <input type="hidden" value={String(watched)} name="watched" />
        <input type="hidden" name="_action" value="toggleWatched" />

        <Box css={{ display: "flex", alignItems: "center", gap: "$4" }}>
          <Checkbox id={title} defaultChecked={watched} />
          <Box as="label" htmlFor={title} css={{ fontSize: "1.125rem" }}>
            {title}
          </Box>
        </Box>
      </Form>
      <Box css={{ display: "flex", gap: "$4" }}>
        <Link to={route}>View Details</Link>
        <Form method="post">
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="_action" value="delete" />
          <Tooltip delayDuration={250}>
            <TooltipTrigger asChild>
              <Box
                as="button"
                css={{
                  background: "none",
                  color: "$yellow8",
                  fontSize: "1.25rem",
                  "&:hover, &:focus": {
                    color: "$yellow9",
                  },
                }}
              >
                <MdDelete />
              </Box>
            </TooltipTrigger>
            <TooltipContent side="left">
              <TooltipArrow />
              Delete from list
            </TooltipContent>
          </Tooltip>
        </Form>
      </Box>
    </>
  );
};
