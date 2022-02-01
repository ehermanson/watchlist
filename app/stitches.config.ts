import { createStitches } from "@stitches/react";
import type * as Stitches from "@stitches/react";
import {
  grayDark,
  skyDark,
  redDark,
  greenDark,
  yellowDark,
} from "@radix-ui/colors";

export const { styled, css, globalCss, getCssText, theme, createTheme } =
  createStitches({
    theme: {
      colors: {
        ...grayDark,
        ...skyDark,
        ...redDark,
        ...greenDark,
        ...yellowDark,
      },
      space: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        7: "28px",
        8: "32px",
        9: "36px",
        10: "40px",
      },
      fonts: {
        body: `-apple-system, 'Segoe UI', Helvetica Neue, Helvetica, Roboto,
        Arial, sans-serif, system-ui, 'Apple Color Emoji', 'Segoe UI Emoji'`,
      },
    },
    utils: {
      // Abbreviated margin properties
      m: (value: Stitches.ScaleValue<"space">) => ({
        margin: value,
      }),
      mt: (value: Stitches.ScaleValue<"space">) => ({
        marginTop: value,
      }),
      mr: (value: Stitches.ScaleValue<"space">) => ({
        marginRight: value,
      }),
      mb: (value: Stitches.ScaleValue<"space">) => ({
        marginBottom: value,
      }),
      ml: (value: Stitches.ScaleValue<"space">) => ({
        marginLeft: value,
      }),
      mx: (value: Stitches.ScaleValue<"space">) => ({
        marginLeft: value,
        marginRight: value,
      }),
      my: (value: Stitches.ScaleValue<"space">) => ({
        marginTop: value,
        marginBottom: value,
      }),
      // Abbreviated padding properties
      p: (value: Stitches.ScaleValue<"space">) => ({
        padding: value,
      }),
      pt: (value: Stitches.ScaleValue<"space">) => ({
        paddingTop: value,
      }),
      pr: (value: Stitches.ScaleValue<"space">) => ({
        paddingRight: value,
      }),
      pb: (value: Stitches.ScaleValue<"space">) => ({
        paddingBottom: value,
      }),
      pl: (value: Stitches.ScaleValue<"space">) => ({
        paddingLeft: value,
      }),
      px: (value: Stitches.ScaleValue<"space">) => ({
        paddingLeft: value,
        paddingRight: value,
      }),
      py: (value: Stitches.ScaleValue<"space">) => ({
        paddingTop: value,
        paddingBottom: value,
      }),
    },
  });

globalCss({
  body: {
    color: "$gray12",
    backgroundColor: "$gray1",
    fontFamily: "$body",
    lineHeight: 1.5,
    minHeight: "calc(100vh - env(safe-area-inset-bottom))",
    background: `linear-gradient(
      145deg,
      $gray1 0%,
      $gray4 25%,
      $gray6 50%,
      $gray4 75%,
      $gray1 100%
    )`,
  },

  a: {
    color: "$gray12",
  },
})();
