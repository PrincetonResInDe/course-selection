import React from "react";
import { Box, CssBaseline } from "@mui/material";
import Path from "../components/path/pathComponents/path";
import AppBar from "../components/shared/appBarComponent/appBar";
import Calendar from "../components/calendar/calendarComponent/calendar";
import CourseList from "../components/calendar/courseListComponent/courseList.js";
import BookmarkList from "../components/calendar/bookmarkListComponent/bookmarkList.js";
import SearchBar from "../components/shared/searchComponent/searchBar";
import SearchResults from "../components/shared/searchComponent/searchResults";
import Title from "../components/shared/titleComponent/title";
import PathTree from "../components/path/PathTree/pathTree";
import { DragDropContext } from "react-beautiful-dnd";

export default function PathPage() {
  

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
          width: "15vw",
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
      <Box sx={{ width: "70vw" }}>
     
          <Path />
     
      </Box>
      <Box
        sx={{
          width: "20vw",
          ml: 2,
          display: "flex",
          flexFlow: "column",
          height: "100%",
        }}
      >
        <PathTree />
      </Box>
    </Box>
  );
}
