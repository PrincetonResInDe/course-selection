import React from "react";
import { Box } from "@mui/material";
import AppBar from "../components/shared/appBarComponent/appBar";
import Calendar from "../components/calendar/calendarComponent/calendar";
import CourseList from "../components/calendar/courseListComponent/courseList.js";
import BookmarkList from "../components/calendar/bookmarkListComponent/bookmarkList.js";
import Search from "../components/calendar/searchComponent/search";
export default function CalendarPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <Search />
      <Box sx={{ width: "70vw", mt: 2, mb: 2, mr: 2 }}>
        <Calendar />
      </Box>
      <Box
        sx={{
          mr: 2,
          mt: 2,
          mb: 2,
          display: "flex",
          flexFlow: "column",
        }}
      >
        <Box sx={{ flex: "0 1 auto" }}>
          <AppBar />
        </Box>
        <Box sx={{ flex: "1 1 auto", height: "94%" }}>
          <Box sx={{ display: "flex", flexFlow: "column", height: "100%" }}>
            <Box sx={{ height: "49%" }}>
              <CourseList />
            </Box>
            <Box sx={{ mb: 2, height: "1%" }}></Box>
            <Box sx={{ height: "48%" }}>
              <BookmarkList />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
