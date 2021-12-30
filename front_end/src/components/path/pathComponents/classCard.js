import React from "react";
import { Box } from "@mui/material";

export default function ClassCard() {
  return (
    <Box
      sx={{
        m: 0.5,
        backgroundColor: "#F2F8FF",
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
