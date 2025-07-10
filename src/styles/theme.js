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
    },
    pink: {
      500: "#FF69B4",
    },
    blue: {
      500: "#2563eb",
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
        color: "white",
      },
    },
  },
  components: {
    Card: {
      baseStyle: {
        bg: "white",
        color: "maroon.500",
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
          color: "white",
          _hover: { bg: "maroon.600" },
        },
        turquoise: {
          bg: "turquoise.500",
          color: "maroon.700",
          _hover: { bg: "turquoise.500", opacity: 0.85 },
        },
        pink: {
          bg: "pink.500",
          color: "maroon.700",
          _hover: { bg: "pink.500", opacity: 0.85 },
        },
        cream: {
          bg: "cream.100",
          color: "maroon.700",
          _hover: { bg: "cream.200" },
        },
      },
    },
  },
});

export default theme;
