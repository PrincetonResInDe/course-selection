import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import AppBar from "../components/shared/appBarComponent/appBar";
import Calendar from "../components/calendar/calendarComponent/calendar";
import CourseList from "../components/calendar/courseListComponent/courseList.js";
import BookmarkList from "../components/calendar/bookmarkListComponent/bookmarkList.js";
import Search from "../components/calendar/searchComponent/search";
import ReviewPage from "./reviewPage";

export default function CalendarPage() {
  const review = <ReviewPage
    sx = {{ position: "absolute"}}>
  </ReviewPage>

  const [show, setShow] = useState(false);

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
          display: "flex",
          flexDirection: "row",
          height: "100vh",
          backgroundColor: "background.default",
          position: 'relative',
          top: 0,
          left: 0
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
          <Box sx={{ height: "50%", mb: 1 }}>
            <CourseList />
          </Box>
          <Box sx={{ height: "50%", mt: 1 }}>
            <BookmarkList />
          </Box>
        </Box>
      </Box>

      {review }

    </Box>
  );
}