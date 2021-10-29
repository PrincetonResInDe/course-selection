import React from "react";
import { Box } from "@mui/material";

export default function BookmarkCard() {
  return (
    <Box
      sx={{
        m: 0.5,
        backgroundColor: "purple",
        height: "40px",
        minWidth: "150px",
        borderRadius: 1.5,
        padding: 1,
        flex: "1 1 auto",
      }}
    >
      Name
    </Box>
  );
}
