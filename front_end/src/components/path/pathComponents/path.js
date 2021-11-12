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
import { DragDropContext } from "react-beautiful-dnd";

export default function Path() {
  

  var semesters = [{ title: "Fall 2021", courses: ["cos126"] }];
  const [semeseter, updateSemester] = useState([
    [],
    ["cos1"],
    ["cos2"],
    ["cos3"],
    ["cos4"],
    ["cos5"],
    ["cos6"],
    ["cos7"],
    ["cos8"],
  ]);

const onDragEnd = (result) => {
    console.log("dragging", result);
    // let schedule = (this.state.schedule || DEFAULT_SCHEDULE).slice();
    // let searchResults = this.state.searchResults;

    if (result.destination === null) return;
    const destSem = result.destination.index; 
    const sourceSem = result.source.index; 
    const courseCode = result.draggableId; 
    console.log(destSem)
    var newSem = semeseter; 
    
    // move from search to courses
    // move between semesters
    newSem[sourceSem].splice(newSem[sourceSem].indexOf(courseCode)); 
    newSem[destSem].splice(-1, 0, courseCode); 

    console.log(newSem); 
    //remove class from one semester 



    // if (result.source.droppableId.includes('search-result-droppable')) {
    //   // moving course from search results to schedule
    //   let searchResultsCourse = searchResults[sourceCourseIndex];
    //   let course = {};
    //   course['id'] = searchResultsCourse['id'];
    //   course['name'] = searchResultsCourse['name'];
    //   course['title'] = searchResultsCourse['title'];
    //   course['dist_area'] = searchResultsCourse['dist_area'];
    //   course['semester'] = searchResultsCourse['semester'];
    //   course['semester_list'] = searchResultsCourse['semester_list'];
    //   course['settled'] = [];
    //   schedule[destSemId].splice(destCourseIndex, 0, course);
    // } else {
    //   // moving course between or within semesters
    //   let sourceSemId = parseInt(
    //     result.source.droppableId.split('sem')[1],
    //     RADIX
    //   );
    //   let course = schedule[sourceSemId].splice(sourceCourseIndex, 1)[0];
    //   schedule[destSemId].splice(destCourseIndex, 0, course);
    // }

    // this.setState({ schedule: schedule });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <Box sx={{ height: "100%" }}>
      <Box sx={{ height: "5%" }}>
        <PathTab />
      </Box>
      <Box sx={{ display: "flex", flexFlow: "column", height: "95%" }}>
        <Box sx={{ flex: "1 1 auto", height: "40%" }}>
          <Box sx={{ display: "flex", height: "100%" }}>
            {semeseter.slice(1, 5).map((classes, index) => (
              <PathCard          
                classes={classes}
                title={semesters[0].title}
                semIndex={index }
  
              />
            ))}
          </Box>
        </Box>
        <Box sx={{ flex: "1 1 auto", height: "40%" }}>
          <Box sx={{ display: "flex", height: "100%" }}>
            {semeseter.slice(5, 9).map((classes, index) => (
              <PathCard
                classes={classes}
                title={semesters[0].title}
                semIndex = {4 + index}
              />
            ))}
          </Box>
        </Box>
        <Box sx={{ flex: "1 1 auto", height: "20%" }}>
          <Bookmarks />
        </Box>
      </Box>
    </Box>
    </DragDropContext>
  );
}
