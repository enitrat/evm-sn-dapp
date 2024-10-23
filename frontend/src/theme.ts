import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: "#e0f2ff",
      100: "#b8dcff",
      200: "#8ac5ff",
      300: "#5cadff",
      400: "#3395ff",
      500: "#0a7dff",
      600: "#0062cc",
      700: "#004999",
      800: "#003166",
      900: "#001833",
    },
  },
});

export default theme;
