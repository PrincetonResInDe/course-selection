import React, { useState } from "react";
import { Box } from "@mui/material";
import Path from "../components/path/pathComponents/path";
import AppBar from "../components/shared/appBarComponent/appBar";
import Calendar from "../components/calendar/calendarComponent/calendar";
import CourseList from "../components/calendar/courseListComponent/courseList.js";
import BookmarkList from "../components/calendar/bookmarkListComponent/bookmarkList.js";
import Search from "../components/calendar/searchComponent/search";
import Title from "../components/shared/titleComponent/title";
import PathTree from "../components/path/PathTree/pathTree";
import PathTab from "../components/path/pathComponents/pathTab";
import PathCard from "../components/path/pathComponents/pathCard";
import Bookmarks from "../components/path/pathComponents/bookmarks";
import { DragDropContext } from "react-beautiful-dnd";

export default function PathPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        backgroundColor: "background.default",
        width: "100wh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          flexDirection: "row",
          height: "95vh",
          mt: 2,
          mb: 2,
          mr: 2,
        }}
      >
        {/* <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "80vw",
          mt: 2,
          mb: 2,
          mr: 5,
        }}
      > */}
        <Path />
      </Box>
      <PathTree />
    </Box>
  );
}
