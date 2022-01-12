import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import CourseListCard from "./courseListCard";
import { useCalendarStore } from "../../../zustand/calendar";

export default function CourseList() {
  const [searchWidth] = useCalendarStore((state) => [state.searchWidth]);

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column",
        width: `calc(${searchWidth}px + 16px)`,
        height: "100%",
        backgroundColor: "white",
        borderRadius: 2,
      }}
    >
      <Typography
        variant="caption"
        sx={{ pt: 1, textAlign: "center", fontWeight: 600 }}
      >
        2021 SPRING
      </Typography>
      <Divider />

      <Box sx={{ flexGrow: 1, overflow: "auto", mb: 1 }}>
        <Box sx={{ height: 0 }}>
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
    </Box>
  );
}
