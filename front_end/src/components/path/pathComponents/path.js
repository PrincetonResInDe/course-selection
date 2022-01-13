import React, { useState } from "react";
import "../../../App.css";

import Box from "@mui/material/Box";
import PathCard from "./pathCard";
import PathTab from "./pathTab";
import Bookmarks from "./bookmarks";
import { DragDropContext } from "react-beautiful-dnd";

// import Search from "../../calendar/searchComponent/search";
import Search from "../../shared/searchComponent/search"

export default function Path() {
  var semesters = [{ title: "Fall 2021", courses: ["cos126"] }];
  const data = [
    {
      code : "COS126", 
      course_num: "COS 126 / COS 109",
      course_name: "Computer Science: An Interdisciplinary Approach",
      rating: "4.75",
      distribution: ["LA", "PDF"],
      availability: ["F&S"],
      prev_offered: ["2022"],
      id: 435345, 
    },
    {
      code: "ORF245",
      course_num: "ORF 245",
      course_name: "Statistics",
      rating: "4.75",
      distribution: ["LA", "PDF"],
      availability: ["F&S"],
      prev_offered: ["2022"],
      id : 5645463,
    },
    {
      code: "MAE345",
      course_num: "MAE345",
      course_name: "Intro to Robotics",
      rating: "4.15",
      distribution: ["LA", "PDF"],
      availability: ["F&S"],
      prev_offered: ["2022"],
      id: 124145,
    },
    {
      code: "ELE206",
      course_num: "ELE206",
      course_name: "Logic Design",
      rating: "4.75",
      distribution: ["LA", "PDF"],
      availability: ["F&S"],
      prev_offered: ["2022"],
      id: 324235345,
    },
 
  ];
  const [semeseter, setSemester] = useState([
    [], // leave empty
    [data[0]],
    [data[1]],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);

  const onDragEnd = (result) => {
    console.log("dragging", result);
    // let schedule = (this.state.schedule || DEFAULT_SCHEDULE).slice();
    // let searchResults = this.state.searchResults;

    if (result.destination === null) return;
    if(result.destination.droppableId === 'searchBar') return; 
    const destSem = result.destination.droppableId[3];

    
    let sourceSem = result.source.droppableId; 
    if (sourceSem !== 'searchBar') {
      sourceSem = result.source.droppableId[3];
    }

    const courseCode = result.draggableId;
    console.log('courseCode', courseCode); 
    const course = data.filter((c)=> c.code == courseCode)[0]; 
    console.log("course", course); 
    var newSem = semeseter;

    let destCourseIndex = result.destination.index;
    let sourceCourseIndex = result.source.index;

    // move from search to courses
    // move between semesters
    if(sourceSem !== 'searchBar' ){
      
      newSem[sourceSem].splice(newSem[sourceSem].indexOf(course));
    } 
    newSem[destSem].splice(destCourseIndex, 0, course);
    
    //  newSem[destSem].push(course); 
    // newSem[destSem].splice(-1, 0, course);
    setSemester(newSem); 
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

      <Search />
      <Box sx={{ height: "100%" , width: "60vw", mt: 2, mb: 2 }}>
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
                  semIndex={5 + index}
                />
              ))}
            </Box>
          </Box>
          {/* <Box sx={{ flex: "1 1 auto", height: "20%" }}>
          <Bookmarks />
        </Box> */}
        </Box>
      </Box>
    </DragDropContext>
  );
}
