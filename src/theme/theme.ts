import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    // primary: {
    //   main: "#1BA1FF",
    // },
    // secondary: {
    //   main: "#FFCC00",
    // },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
