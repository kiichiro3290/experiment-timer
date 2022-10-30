import { Box, Typography, Button, IconButton } from "@mui/material";
import { PlayCircleFilledWhite, StopCircle } from "@mui/icons-material";
import { useRecording } from "../../hooks/record";
import { theme } from "../../theme";

export const Camera: React.FC = () => {
  const {
    startRecording,
    stopRecording,
    isRecording,
    recordedDataSrc,
    videoRef,
  } = useRecording();
  return (
    <Box sx={{ p: theme.spacing(4) }}>
      <Typography variant="h4">ExperimentTimer</Typography>

      <Box sx={{ display: "flex", px: theme.spacing(2), height: "80vh" }}>
        <Box
          sx={{
            width: "50vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!isRecording && (
            <Box>
              <Typography variant="h4" textAlign="center">
                Start
              </Typography>
              <IconButton onClick={startRecording} color="primary">
                <PlayCircleFilledWhite sx={{ fontSize: "256px" }} />
              </IconButton>
            </Box>
          )}
          {isRecording && (
            <IconButton onClick={stopRecording}>
              <StopCircle sx={{ fontSize: "256px" }} />
            </IconButton>
          )}
        </Box>
        <Box ref={videoRef} component="video" autoPlay muted width="50vw" />
      </Box>

      <Typography>Result</Typography>
      {!isRecording && (
        <Box
          sx={{
            backgroundColor: "blue",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: theme.spacing(8),
            p: theme.spacing(4),
          }}
        >
          <video
            width="320px"
            height="320px"
            src={recordedDataSrc}
            controls
            playsInline
          />
          <Box>
            <Typography>ファイルに保存</Typography>
            <Button variant="contained">ダウンロード</Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};
