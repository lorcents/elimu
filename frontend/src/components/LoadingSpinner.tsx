import React from "react";
import { Box, CircularProgress } from "@mui/material";

const LoadingSpinner: React.FC = () => {
  return (
    <Box textAlign="center" marginTop={2}>
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;
