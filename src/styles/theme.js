 // src/styles/theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    maroon: {
      50: "#fbeaec",
      100: "#f3c2c9",
      200: "#ea99a5",
      300: "#e17082",
      400: "#d9475e",
      500: "#800000", // main maroon
      600: "#660000",
      700: "#4d0000",
      800: "#2a0000", // deep maroon for background
      900: "#1a0000",
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
    },
    lilac: {
      200: "#e9d5ff",
      300: "#d8b4fe",
    },
    white: "#fff",
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: "maroon.800",
        color: "cream.100",
      },
    },
  },
  components: {
    Card: {
      baseStyle: {
        bg: "cream.100",
        color: "maroon.800",
        borderRadius: "lg",
        boxShadow: "lg",
        p: 4,
      },
    },
    Button: {
      baseStyle: {
        fontWeight: "bold",
      },
      variants: {
        maroon: {
          bg: "maroon.500",
          color: "cream.100",
          _hover: { bg: "maroon.600" },
        },
        turquoise: {
          bg: "turquoise.500",
          color: "maroon.800",
          _hover: { bg: "turquoise.500", opacity: 0.85 },
        },
        pink: {
          bg: "pink.500",
          color: "maroon.800",
          _hover: { bg: "pink.500", opacity: 0.85 },
        },
        lilac: {
          bg: "lilac.200",
          color: "maroon.800",
          _hover: { bg: "lilac.300" },
        },
        cream: {
          bg: "cream.100",
          color: "maroon.800",
          _hover: { bg: "cream.200" },
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          bg: "cream.100",
          color: "maroon.800",
        },
      },
    },
  },
});

export default theme;
