import React from "react";
import { Typography, Box } from "@mui/material";

export default function Title() {
  return (
    <Box sx={{ mb: 1 }}>
      <Typography variant="h6" sx={{ fontWeight: 800, color: "color.blue" }}>
        Princeton Planner
      </Typography>
    </Box>
  );
}
