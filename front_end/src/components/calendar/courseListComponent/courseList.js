import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import CourseListCard from "./courseListCard";

export default function CourseList() {
  return (
    <Box sx={{ width: "100%", mb: 2, display: "flex", flexFlow: "column" }}>
      <Box sx={{ flex: "0 1 auto" }}>
        <Typography align="center">2021 SPRING</Typography>
        <Divider />
      </Box>
    </Box>
  );
}
