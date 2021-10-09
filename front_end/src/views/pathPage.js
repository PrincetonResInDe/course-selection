import React from "react";
import "../App.css"
import AppBar from "../components/shared/appBarComponent/appBar";
import Path from "../components/path/pathComponents/path"
import CourseList from "../components/calendar/courseListComponent/courseList.js";
import Search from "../components/shared/searchComponent/search";
import Title from "../components/shared/titleComponent/title";

export default function PathPage() {
  return (
    <div >

      <Title />
      <AppBar />

        <div style = {{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
          <Search />
          <Path/>
          <CourseList />
        </div>
      
    </div>

  );
}
