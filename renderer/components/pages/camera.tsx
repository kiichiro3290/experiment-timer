import { Box, Typography } from "@mui/material";

export const Camera: React.FC = () => {
  return (
    <Box>
      <Typography>カメラ</Typography>
      <Box sx={{ backgroundColor: "red" }}>
        <video src="" width="320px" height="320px"></video>
      </Box>
    </Box>
  );
};
