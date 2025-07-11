 import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    maroon: {
      500: "#800000",
      700: "#4d0000",
    },
    cream: {
      100: "#fff5e1",
      200: "#ffeccc",
    },
    turquoise: {
      500: "#1DE9B6",
    },
    pink: {
      500: "#FF69B4",
      600: "#e75480",
    },
    lilac: {
      200: "#e9d5ff",
      300: "#d8b4fe",
    },
    coffee: {
      100: "#e6d3b3", // light coffee brown
    },
    white: "#fff",
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  styles: {
    global: {
      html: {
        minHeight: "100%",
        bg: "coffee.100",
      },
      body: {
        minHeight: "100%",
        bg: "coffee.100",
        color: "maroon.700",
        fontFamily:
          "'Inter', 'Segoe UI', Arial, sans-serif",
        margin: 0,
        padding: 0,
        overflowX: "hidden",
      },
    },
  },
});

export default theme;
