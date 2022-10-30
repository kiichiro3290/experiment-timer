import { baseTheme } from "./base";

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  ...baseTheme,
  palette: {
    mode: "light",
    primary: {
      main: "#F2A516",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#C64F4F",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
  },
});
