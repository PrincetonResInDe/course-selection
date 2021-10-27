import React from "react";
import { Box } from "@mui/material";
import DayColumn from "./dayColumn";

export default function CalendarTable() {
  const days = ["MON", "TUE", "WED", "THU", "FRI"];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "95%",
        border: "1px solid grey",
      }}
    >
      {days.map((day) => {
        return <DayColumn day={day} />;
      })}
    </Box>
  );
}
