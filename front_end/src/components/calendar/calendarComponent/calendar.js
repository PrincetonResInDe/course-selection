import React from "react";
import { Box } from "@mui/material";
import CalendarTab from "./calendarTab";
import CalendarTable from "./calendarTable";
import { useDrop } from "react-dnd";
import { useCalendarStore } from "../../../zustand/calendar";

export default function Calendar() {
  const [addCalendarClass] = useCalendarStore((state) => [
    state.addCalendarClass,
  ]);

  // handle dropping search card
  const [{ isOver }, drop] = useDrop({
    accept: "SEARCH_CARD",
    // is class card dropped over the calendar component
    drop: (item) => {
      addCalendarClass(item);
    },
    // is class card over the calendar component
    collect: (monitor) => {
      return {
        isOver: !!monitor.isOver(),
      };
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      ref={drop}
    >
      <CalendarTab isOver={isOver} sx={{ flex: "0 1 auto" }} />
      <CalendarTable isOver={isOver} sx={{ flex: "1 1 auto" }} />
    </Box>
  );
}
