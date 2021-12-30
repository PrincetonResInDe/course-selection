import React from "react";
import { Box } from "@mui/material";
import CalendarTab from "./calendarTab";
import CalendarTable from "./calendarTable";
import { useDrop } from "react-dnd";

export default function Calendar() {
  // handle dropping search card
  const [{ isOver }, drop] = useDrop({
    accept: "SEARCH_CARD",
    drop: (item, monitor) => console.log(item, monitor),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", height: "100%" }}
      ref={drop}
    >
      <CalendarTab sx={{ flex: "0 1 auto" }} />
      <CalendarTable sx={{ flex: "1 1 auto" }} />
    </Box>
  );
}
