import React from "react";
import { Box, Card } from "@mui/material";
import DayColumn from "./dayColumn";
import { useCalendarStore } from "../../../zustand/calendar";

export default function CalendarTable() {
  const days = ["MON", "TUE", "WED", "THU", "FRI"];
  const hoveredClass = useCalendarStore((state) => state.hoveredClass);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", height: "100%" }}>
      {days.map((day) => {
        return <DayColumn day={day} />;
      })}
    </Box>
  );
}
