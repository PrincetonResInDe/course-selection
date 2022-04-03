import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import AppBar from "../components/shared/appBarComponent/appBar";
import Calendar from "../components/calendar/calendarComponent/calendar";
import CourseList from "../components/calendar/courseListComponent/courseList.js";
import BookmarkList from "../components/calendar/bookmarkListComponent/bookmarkList.js";
import Search from "../components/calendar/searchComponent/search";
import ReviewPage from "./reviewPage";
import { useSearchStore } from "../zustand/search";

export default function CalendarPage() {
  const [showReview] = useSearchStore((state) => [state.showReview]);
  console.log(showReview)

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
        {Object.keys(showReview).length === 0 ? <Calendar /> : <ReviewPage />}
      </Box>
      <Box
        sx={{
          flexGrow: 1,

          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
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
