import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Review from "../components/review/reviewComponent/review";

export default function ReviewPage() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        mb: 2,
        mr: 2,
        backgroundColor: "#F2F8FF",
      }}
    >
      <Review />
    </Box>
  );
}
