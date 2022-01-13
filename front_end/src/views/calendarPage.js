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
      <Box sx={{ flexGrow: 1, mt: 2, mb: 2, mr: 2 }}>
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
        <Box>
          <AppBar name="Calendar" />
        </Box>
        <Box
          sx={{
            flexGrow: 1,

            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ height: "50%", mb: 0.5 }}>
            <CourseList />
          </Box>
          <Box sx={{ height: "50%", mt: 0.5 }}>
            <BookmarkList />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
