import { Box, Typography, Button } from "@mui/material";
import { useRecording } from "../../hooks/record";

export const Camera: React.FC = () => {
  const {
    startRecording,
    stopRecording,
    isRecording,
    recordedDataSrc,
    videoRef,
  } = useRecording();
  return (
    <Box>
      <Typography>カメラ</Typography>
      <Button
        variant="contained"
        onClick={startRecording}
        disabled={isRecording}
      >
        Start
      </Button>
      <Button
        variant="contained"
        onClick={stopRecording}
        disabled={!isRecording}
      >
        Stop
      </Button>

      <Box
        ref={videoRef}
        component="video"
        autoPlay
        muted
        width="320px"
        height="320px"
        sx={{ backgroundColor: "red", textAlign: "center" }}
      />
      <Box sx={{ backgroundColor: "blue", textAlign: "center" }}>
        <video
          width="320px"
          height="320px"
          src={recordedDataSrc}
          controls
          playsInline
        ></video>
      </Box>

      <Button variant="contained">ダウンロード</Button>
    </Box>
  );
};
