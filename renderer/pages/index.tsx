import { useEffect } from "react";
import { Camera } from "../components/pages/camera";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme";
import CssBaseline from "@mui/material/CssBaseline";

const IndexPage = () => {
  useEffect(() => {
    const handleMessage = (_event, args) => alert(args);

    // add a listener to 'message' channel
    global.ipcRenderer.addListener("message", handleMessage);

    return () => {
      global.ipcRenderer.removeListener("message", handleMessage);
    };
  }, []);

  const onSayHiClick = () => {
    global.ipcRenderer.send("message", "hi from next");
  };

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
