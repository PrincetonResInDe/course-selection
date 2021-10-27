import React from "react";
import { Box } from "@mui/material";
import CalendarTab from "./calendarTab";
import CalendarTable from "./calendarTable";
export default function Calendar() {
  return (
    <Box sx={{ height: "100%" }}>
      <CalendarTab />
      <CalendarTable />
    </Box>
  );
}
