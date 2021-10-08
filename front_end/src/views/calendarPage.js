import React from "react";
import AppBar from "../components/shared/appBarComponent/appBar";
import Calendar from "../components/calendar/calendarComponent/calendar";
import CourseList from "../components/calendar/courseListComponent/courseList.js";
import Search from "../components/shared/searchComponent/search";
import Title from "../components/shared/titleComponent/title";

export default function CalendarPage() {
  return (
    <div>
      <div>
        <Title />
        <Search />
      </div>
      <Calendar />
      <div>
        <AppBar />
        <CourseList />
      </div>
    </div>
  );
}
