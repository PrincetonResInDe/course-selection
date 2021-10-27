import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import CourseListCard from "./courseListCard";

export default function CourseList() {
  return (
    <Box sx={{ display: "flex", flexFlow: "column", height: "100%" }}>
      <Box sx={{ flex: "0 1 auto" }}>
        <Typography align="center">2021 SPRING</Typography>
        <Divider />
      </Box>
      <Box sx={{ flex: "1 1 auto", overflow: "auto" }}>
        <CourseListCard />
        <CourseListCard />
        <CourseListCard />
        <CourseListCard />
        <CourseListCard />
        <CourseListCard />
        <CourseListCard />
        <CourseListCard />
        <CourseListCard />
        <CourseListCard />
      </Box>
    </Box>
  );
}
