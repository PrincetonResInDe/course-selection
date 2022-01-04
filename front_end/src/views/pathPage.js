import React, { useState } from 'react';
import { Box, CssBaseline } from "@mui/material";
import SearchBar from "../components/shared/searchComponent/searchBar";
import SearchResults from "../components/shared/searchComponent/searchResults";
import Title from "../components/shared/titleComponent/title";
import PathTree from "../components/path/PathTree/pathTree";
import PathTab from "../components/path/pathComponents/pathTab";
import PathCard from "../components/path/pathComponents/pathCard"
import Bookmarks from "../components/path/pathComponents/bookmarks";
import { DragDropContext } from "react-beautiful-dnd";

export default function PathPage() {
  var semesters = [{ title: "Fall 2021", courses: ["cos126"] }];
  const [semeseter, updateSemester] = useState([
    [],
    [],
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
    if(result.destination.droppableId == 'searchBar') return; 
    
    const destSem = result.destination.droppableId[3]; 
    const sourceSem = result.source.droppableId[3]; 
    const courseCode = result.draggableId; 
    console.log(destSem)
    var newSem = semeseter; 
    
    // move from search to courses
    // move between semesters
    if(result.source.droppableId != "searchBar"){
      newSem[sourceSem].splice(newSem[sourceSem].indexOf(courseCode), 1); 
    }
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
                semIndex={index + 1}
  
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
    </DragDropContext>
  );
}
