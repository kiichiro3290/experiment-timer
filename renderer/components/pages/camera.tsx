import { Box, Typography, Button, IconButton } from "@mui/material";
import { PlayCircleFilledWhite, StopCircle } from "@mui/icons-material";
import { useRecording } from "../../hooks/record";
import { theme } from "../../theme";
import Image from "next/image";
import movementImage from "../../../build/move.png";
import uplightImage from "../../../build/uplight.png";

export const Camera: React.FC = () => {
  const {
    startRecording,
    stopRecording,
    isRecording,
    recordedDataSrc,
    videoRef,
    time,
    subTime,
  } = useRecording();

  return (
    <Box sx={{ p: theme.spacing(4) }}>
      <Typography variant="h4">ExperimentTimer</Typography>

      <Box
        sx={{
          display: "flex",
          height: "90vh",
          p: theme.spacing(2),
          backgroundColor: theme.palette.primary.main,
          borderRadius: theme.spacing(2),
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            width: "50%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: theme.spacing(1),
            backgroundColor: theme.palette.background.paper,
          }}
        >
          {!isRecording && (
            <Box>
              <Typography variant="h4" textAlign="center">
                Start
              </Typography>
              <IconButton onClick={startRecording} color="secondary">
                <PlayCircleFilledWhite sx={{ fontSize: "256px" }} />
              </IconButton>
            </Box>
          )}
          {isRecording && (
            <Box sx={{ width: "100%" }}>
              <Typography
                variant="h2"
                sx={{ width: "100%", textAlign: "center" }}
              >
                time:{time}
              </Typography>
              <Box
                sx={{
                  width: "80%",
                  display: "flex",
                  m: "0 auto",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    textAlign: "start",
                    my: theme.spacing(2),
                  }}
                >
                  <Typography variant="h4">subTimer：{subTime.time}</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {subTime.isStoppingUser ? (
                  <Box>
                    <Image
                      src={uplightImage.src}
                      width={160}
                      height={240}
                      alt=""
                    />
                    <Typography
                      variant="h4"
                      sx={{ textAlign: "center", my: theme.spacing(1) }}
                    >
                      Stop
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    <Image
                      src={movementImage.src}
                      width={240}
                      height={240}
                      alt=""
                    />
                    <Typography
                      variant="h4"
                      sx={{ textAlign: "center", my: theme.spacing(1) }}
                    >
                      Move
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </Box>

        <Box sx={{ width: "48%" }}>
          <Box
            ref={videoRef}
            component="video"
            autoPlay
            muted
            width="100%"
            sx={{ transform: "scaleX(-1)" }}
          />
          {isRecording && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <IconButton onClick={stopRecording}>
                <StopCircle sx={{ fontSize: "128px" }} />
              </IconButton>
            </Box>
          )}
        </Box>
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
