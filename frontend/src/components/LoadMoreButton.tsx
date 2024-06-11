import React from "react";
import { Box, Button } from "@mui/material";

interface LoadMoreButtonProps {
  onClick: () => void;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick }) => {
  return (
    <Box textAlign="center" marginTop={2}>
      <Button variant="contained" color="primary" onClick={onClick}>
        Load More
      </Button>
    </Box>
  );
};

export default LoadMoreButton;
