import * as React from "react";
import "../../../App.css";
import ReactDOM from "react-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PathCard from "./pathCard";
import PathTab from "./pathTab";
import Bookmarks from "./bookmarks";
export default function Path() {
  var semesters = [{ title: "Fall 2021", courses: ["cos126"] }];

  return (
    <Box sx={{ height: "100%" }}>
      <Box sx={{ height: "5%" }}>
        <PathTab />
      </Box>
      <Box sx={{ display: "flex", flexFlow: "column", height: "95%" }}>
        <Box sx={{ flex: "1 1 auto", height: "40%" }}>
          <Box sx={{ display: "flex", height: "100%" }}>
            <PathCard title={semesters[0].title} />
            <PathCard title={semesters[0].title} />
            <PathCard title={semesters[0].title} />
            <PathCard title={semesters[0].title} />
          </Box>
        </Box>
        <Box sx={{ flex: "1 1 auto", height: "40%" }}>
          <Box sx={{ display: "flex", height: "100%" }}>
            <PathCard title={semesters[0].title} />
            <PathCard title={semesters[0].title} />
            <PathCard title={semesters[0].title} />
            <PathCard title={semesters[0].title} />
          </Box>
        </Box>
        <Box sx={{ flex: "1 1 auto", height: "20%" }}>
          <Bookmarks />
        </Box>
      </Box>
    </Box>
  );
}
