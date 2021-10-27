import React from "react";
import "../App.css"
import AppBar from "../components/shared/appBarComponent/appBar";
import Path from "../components/path/pathComponents/path"
import CourseList from "../components/calendar/courseListComponent/courseList.js";
import SearchBar from "../components/shared/searchComponent/searchBar";
import SearchResults from "../components/shared/searchComponent/searchResults";
import Title from "../components/shared/titleComponent/title";
import { Box, CssBaseline } from "@mui/material";
export default function PathPage() {
  return (
    <div >

      <Title />
      <AppBar />

        <div style = {{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>

          <Path/>
         <Box sx={{ height: "49%" }}>
              <CourseList />
            </Box>
        </div>
      
    </div>

  );
}
