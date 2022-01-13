import React from "react";
import { Box } from "@mui/material";
import Path from "../components/path/pathComponents/path";
import Search from "../components/calendar/searchComponent/search";
import PathTree from "../components/path/PathTree/pathTree";

export default function CalendarPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
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
  );
}
