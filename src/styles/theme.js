import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    maroon: {
      50: "#fbeaec",
      100: "#f3c2c9",
      200: "#ea99a5",
      300: "#e17082",
      400: "#d9475e",
      500: "#800000",
      600: "#660000",
      700: "#4d0000",
      800: "#1a0000",
      900: "#0d0000",
    },
    cream: {
      100: "#fff5e1",
      200: "#ffeccc",
      300: "#f7e6d4",
      400: "#e6d3b3",
    },
    turquoise: {
      500: "#1DE9B6",
      600: "#13b88a",
    },
    pink: {
      500: "#FF69B4",
    },
    lilac: {
      200: "#e9d5ff",
      300: "#d8b4fe",
      400: "#a78bfa",
    },
    orange: {
      300: "#FFA726",
      400: "#FF9800",
    },
    deepPink: {
      400: "#FF1493",
    },
    green: {
      400: "#4CAF50",
      500: "#388E3C",
    },
    white: "#fff",
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  radii: {
    none: "0",
    sm: "0.125rem",
    base: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    "2xl": "2rem",
    full: "9999px",
  },
  styles: {
    global: {
      body: {
        bg: "maroon.800",
        color: "cream.100",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
      },
      a: {
        color: "turquoise.500",
        _hover: { color: "pink.500", textDecoration: "underline" },
      },
      "::-webkit-scrollbar": {
        width: "8px",
        background: "maroon.500",
      },
      "::-webkit-scrollbar-thumb": {
        background: "pink.500",
        borderRadius: "4px",
      },
    },
  },
  components: {
    Card: {
      baseStyle: {
        bg: "cream.100",
        color: "maroon.800",
        borderRadius: "xl",
        boxShadow: "lg",
        p: 4,
      },
      variants: {
        maroonCard: {
          bg: "maroon.900",
          color: "cream.100",
        },
        gradientCard: {
          bgGradient: "linear(to-br, maroon.700, lilac.200)",
          color: "cream.100",
        },
      },
    },
    Button: {
      baseStyle: { fontWeight: "bold", borderRadius: "xl" },
      variants: {
        maroon: {
          bg: "maroon.500",
          color: "cream.100",
          _hover: { bg: "maroon.600" },
        },
        turquoise: {
          bg: "turquoise.500",
          color: "maroon.800",
          _hover: { bg: "turquoise.600" },
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
        orange: {
          bg: "orange.300",
          color: "maroon.900",
          _hover: { bg: "orange.400" },
        },
        green: {
          bg: "green.400",
          color: "white",
          _hover: { bg: "green.500" },
        },
        deepPink: {
          bg: "deepPink.400",
          color: "white",
          _hover: { bg: "pink.500" },
        },
        primary: {
          bgGradient: "linear(to-r, turquoise.500, orange.300)",
          color: "maroon.900",
          _hover: { bgGradient: "linear(to-r, orange.300, turquoise.500)" },
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          bg: "cream.100",
          color: "maroon.800",
          borderRadius: "xl",
        },
      },
    },
  },
});

export default theme;
