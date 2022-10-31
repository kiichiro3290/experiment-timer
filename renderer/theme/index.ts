import { baseTheme } from "./base";

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  ...baseTheme,
  palette: {
    mode: "light",
    primary: {
      main: "#7DB8FF",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#F2A516",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
  },
});
