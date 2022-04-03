import React from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { useSearchStore } from "../../../zustand/search";

export default function ReviewInfo() {
  const [showReview] = useSearchStore((state) => [state.showReview]);

  console.log(showReview);
  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "row",
        width: "25vw",
      }}
    >
      <Box sx={{ mb: 1 }}>
        <Typography variant="h6">4.01</Typography>
      </Box>
      <Box sx={{ mb: 1 }}>
        <Typography variant="h6">EC</Typography>
      </Box>
      <Box sx={{ mb: 1 }}>
        <Typography variant="h6">NO AUDIT</Typography>
      </Box>
      <Box sx={{ mb: 1 }}>
        <Typography variant="h6">PDF</Typography>
      </Box>
    </Box>
  );
}
