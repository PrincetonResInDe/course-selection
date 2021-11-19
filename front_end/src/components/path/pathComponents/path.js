import React, { useState } from 'react';
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
  const [semeseter, updateSemester] = useState([
    ["cos1"],
    ["cos2", "soc2"],
    ["cos3"],
    ["cos4"],
    ["cos5"],
    ["cos6"],
    ["cos7"],
    ["cos8"],
  ]);

  // function handleOnDragEnd(result, semesterNo) {
  //   console.log("RESULT" , result); 
  //   console.log("SEM NO", semesterNo); 
  //   if (!result.destination) return;

  //   const items = Array.from(semeseter[semesterNo]);
  //   const [reorderedItem] = items.splice(result.source.index, 1);
  //   items.splice(result.destination.index, 0, reorderedItem);

  //   updateClassesSem(items);
  // }

  return (
    <Box sx={{ height: "100%" }}>
      <Box sx={{ height: "5%" }}>
        <PathTab />
      </Box>
      <Box sx={{ display: "flex", flexFlow: "column", height: "95%" }}>
        <Box sx={{ flex: "1 1 auto", height: "40%" }}>
          <Box sx={{ display: "flex", height: "100%" }}>
            {semeseter.slice(0, 4).map((classes, index) => (
              <PathCard          
                classes={classes}
                title={semesters[0].title}
                semIndex={index + 1}
  
              />
            ))}
          </Box>
        </Box>
        <Box sx={{ flex: "1 1 auto", height: "40%" }}>
          <Box sx={{ display: "flex", height: "100%" }}>
            {semeseter.slice(4, 8).map((classes, index) => (
              <PathCard
                classes={classes}
                title={semesters[0].title}
                semIndex = {5 + index}
              />
            ))}
          </Box>
        </Box>
        <Box sx={{ flex: "1 1 auto", height: "20%" }}>
          <Bookmarks />
        </Box>
      </Box>
    </Box>
  );
}
