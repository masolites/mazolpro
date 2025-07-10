 const theme = extendTheme({
  colors: {
    maroon: {
      800: "#1a0000", // even darker maroon
      900: "#0d0000", // almost black
      // ...other shades
    },
    // ...other colors
  },
  styles: {
    global: {
      body: {
        bg: "maroon.800", // use the darkest maroon
        color: "cream.100",
      },
    },
  },
  // ...rest of theme
});
