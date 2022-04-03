import React, { useState } from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import ReviewInfo from "./reviewInfo";
import { useSearchStore } from "../../../zustand/search";

export default function ReviewHeader() {
  const [showReview] = useSearchStore((state) => [state.showReview]);

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column",
        m: 2,
      }}
    >
      <Box sx={{ mb: 1 }}>
        <Typography variant="h6">{showReview.catalog_title}</Typography>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Box>
          <Typography variant="h6">{showReview.title}</Typography>
        </Box>
        <Box sx={{ flex: 1, m: 1 }} />
        <Box>
          <ReviewInfo />
        </Box>
      </Box>
    </Box>
  );
}
