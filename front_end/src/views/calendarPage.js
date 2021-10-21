import React from "react";
import { Box, CssBaseline } from "@mui/material";
import AppBar from "../components/shared/appBarComponent/appBar";
import Calendar from "../components/calendar/calendarComponent/calendar";
import CourseList from "../components/calendar/courseListComponent/courseList.js";
import BookmarkList from "../components/calendar/bookmarkListComponent/bookmarkList.js";
import SearchBar from "../components/shared/searchComponent/searchBar";
import SearchResults from "../components/shared/searchComponent/searchResults";
import Title from "../components/shared/titleComponent/title";
import CourseListCard from "../components/calendar/courseListComponent/courseListCard";

export default function CalendarPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        p: 2,
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexFlow: "column",
          width: "20vw",
          mr: 2,
        }}
      >
        <Box sx={{ flex: "0 1 auto" }}>
          <Title />
          <SearchBar />
        </Box>
        <Box sx={{ flex: "1 1 auto", overflow: "auto" }}>
          <SearchResults />
        </Box>
      </Box>
      <Box sx={{ width: "60vw" }}>
        <Calendar />
      </Box>
      <Box sx={{ width: "20vw", ml: 2, display: "flex", flexFlow: "column" }}>
        <Box sx={{ flex: "0 1 auto" }}>
          <AppBar />
        </Box>
        <Box sx={{ flex: "1 1 auto" }}>
          <CourseList />
        </Box>
        <Box sx={{ flex: "1 1 auto" }}>
          <BookmarkList />
        </Box>
      </Box>
    </Box>
  );
}
