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
      800: "#330000",
      900: "#1a0000",
    },
    cream: {
      50: "#fffdf7",
      100: "#fff5e1",
      200: "#ffeccc",
      300: "#ffe4b8",
      400: "#ffdb99",
      500: "#ffd180",
    },
    turquoise: {
      500: "#1DE9B6",
      600: "#13bfa6",
    },
    pink: {
      500: "#FF69B4",
      600: "#e055a0",
    },
    lilac: {
      100: "#f3e8ff",
      200: "#e9d5ff",
      300: "#d8b4fe",
      400: "#c084fc",
      500: "#a21caf",
    },
    blue: {
      500: "#2563eb",
    },
    gray: {
      700: "#2d3748",
      600: "#4a5568",
      500: "#718096",
    },
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: "maroon.500",
        color: "cream.100",
      },
    },
  },
  components: {
    Card: {
      baseStyle: {
        bg: "cream.100",
        color: "maroon.700",
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
          color: "maroon.700",
          _hover: { bg: "turquoise.600" },
        },
        pink: {
          bg: "pink.500",
          color: "cream.100",
          _hover: { bg: "pink.600" },
        },
        lilac: {
          bg: "lilac.200",
          color: "maroon.700",
          _hover: { bg: "lilac.300" },
        },
        cream: {
          bg: "cream.100",
          color: "maroon.700",
          _hover: { bg: "cream.200" },
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          bg: "cream.100",
          color: "maroon.700",
        },
      },
    },
  },
});

export default theme;
