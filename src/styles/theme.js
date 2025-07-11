 import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    maroon: {
      50: "#fbeaec",
      100: "#f3c2c9",
      200: "#ea99a5",
      300: "#e17082",
      400: "#d9475e",
      500: "#b22234", // lighter, dark red maroon
      600: "#a11a2b",
      700: "#8b1625",
      800: "#7a1420", // new background
      900: "#4d0000",
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
    orange: {
      400: "#FFA726",
    },
    lemon: {
      400: "#D4FF00",
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
        bg: "maroon.800",
      },
      body: {
        minHeight: "100%",
        bg: "maroon.800",
        color: "cream.100",
        fontFamily:
          "'Inter', 'Segoe UI', Arial, sans-serif",
        margin: 0,
        padding: 0,
        overflow: "hidden", // Prevent scrolling
      },
    },
  },
});

export default theme;
