import { Box, Typography, Button, IconButton } from "@mui/material";
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

      <Box sx={{ display: "flex", p: theme.spacing(2) }}>
        <Box
          sx={{
            width: "50vw",
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!isRecording && (
            <IconButton
              onClick={startRecording}
              sx={{
                width: "128px",
                height: "128px",
                backgroundColor: theme.palette.primary.main,
              }}
            >
              Start
            </IconButton>
          )}
          {isRecording && (
            <IconButton
              onClick={stopRecording}
              sx={{
                width: "128px",
                height: "128px",
                backgroundColor: theme.palette.primary.main,
              }}
            >
              Stop
            </IconButton>
          )}
        </Box>
        <Box
          ref={videoRef}
          component="video"
          autoPlay
          muted
          width="50vw"
          height="50vh"
        />
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
