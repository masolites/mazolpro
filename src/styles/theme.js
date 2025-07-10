// src/styles/theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      maroon: "#800000",
      cream: "#FFF5E1",
      pink: "#FF69B4",
      turquoise: "#1DE9B6",
      blue: "#2563eb",
    },
  },
  styles: {
    global: {
      body: {
        bg: "#FFF5E1", // cream
        color: "#800000", // maroon
      },
      a: {
        color: "#2563eb",
      },
    },
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
      },
      variants: {
        solid: (props) => ({
          bg:
            props.colorScheme === "pink"
              ? "#FF69B4"
              : props.colorScheme === "turquoise"
                ? "#1DE9B6"
                : props.colorScheme === "maroon"
                  ? "#800000"
                  : props.colorScheme === "cream"
                    ? "#FFF5E1"
                    : undefined,
          color:
            props.colorScheme === "cream" ||
            props.colorScheme === "turquoise"
              ? "#800000"
              : "#FFF5E1",
          _hover: {
            opacity: 0.9,
          },
        }),
      },
    },
  },
});

export default theme;
