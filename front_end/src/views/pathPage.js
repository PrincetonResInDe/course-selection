
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Path from "../components/path/pathComponents/path";
import Search from "../components/calendar/searchComponent/search";
import PathTree from "../components/path/PathTree/pathTree";
import PathTab from "../components/path/pathComponents/pathTab";
import PathCard from "../components/path/pathComponents/pathCard";
import Bookmarks from "../components/path/pathComponents/bookmarks";
import { DragDropContext } from "react-beautiful-dnd";

export default function PathPage() {
  var semesters = [{ title: "Fall 2021", courses: ["cos126"] }];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        width: "100vw",
        backgroundColor: "background.default",
        justifyContent: "space-between"
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "80vw",
          mt: 2,
          mb: 2,
          mr: 5,

        }}
      >
        <Path />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1, 
          width: "90vw", 
          mt: 3,
          mr: 0,
          height: "100%",
        }}
      >
        <Search />
        <Box sx={{ width: "70vw", mt: 2 }}>
          <Path />
        </Box>
        <Box
          sx={{
            width: "20vw",
            mt: 2,
            ml: 2,
            display: "flex",
            flexFlow: "column",
            height: "100%",
          }}
        >
          <PathTree />
        </Box>
      </Box>
    </Box>
  );
}
