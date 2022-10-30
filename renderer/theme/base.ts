import { createTheme } from "@mui/material/styles";

export const baseTheme = createTheme({
  shape: { borderRadius: 3 },
  typography: {
    fontFamily: "Noto Sans JP, sans-serif",
    fontWeightBold: 700,
    fontWeightMedium: 500,
    fontWeightRegular: 400,
    fontWeightLight: 200,
  },
});
