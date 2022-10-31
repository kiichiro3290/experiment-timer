import { useEffect } from "react";
import { Camera } from "../components/pages/camera";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme";
import CssBaseline from "@mui/material/CssBaseline";

const IndexPage = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Camera />
      </ThemeProvider>
    </>
  );
};

export default IndexPage;
