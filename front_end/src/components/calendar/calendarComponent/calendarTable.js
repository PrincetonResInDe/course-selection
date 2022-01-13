import React from "react";
import { Box, Typography, Divider } from "@mui/material";
// import { useResizeDetector } from "react-resize-detector";
// import { useCalendarStore } from "../../../zustand/calendar";
// import ClassCard from "./classCard";

function HourSlot(props) {
  //   const { _, height, ref } = useResizeDetector();
  //   const hoveredClass = useCalendarStore((state) => state.hoveredClass);

  return (
    <Box sx={{ height: "100%" }}>
      <Box
        sx={{
          height: "100%",
          flexDirection: "column",
          display: "flex",
          width: "100%",
        }}
      >
        {props.day === "MON" ? (
          <Typography sx={{ textAlign: "start", color: "color.grey" }}>
            {props.time}
          </Typography>
        ) : (
          <></>
        )}
        <Divider sx={{ flexGrow: 1 }} />
      </Box>
      {/* TO DO WHEN SEARCH ENDPOINT COMPLETED:<Box
        sx={{
          position: "relative",
          top: "-100%",
          width: "100%",
          height: "100%",
        }}
        ref={ref}
      >
        <ClassCard height={height} />
      </Box> */}
    </Box>
  );
}

export default function CalendarTable(props) {
  // const [calendarClasses] = useCalendarStore((state) => [
  //   state.calendarClasses,
  // ]);

  const times = [
    "8am",
    "9am",
    "10am",
    "11am",
    "12pm",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm",
    "6pm",
    "7pm",
    "8pm",
    "9pm",
    "10pm",
    "11pm",
  ];

  const days = ["MON", "TUE", "WED", "THU", "FRI"];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "100%",
        backgroundColor: props.isOver ? "color.lightBlue" : "white",
      }}
    >
      {days.map((day, index) => {
        return (
          <Box
            key={index}
            sx={{
              flexGrow: 1,
              height: "100%",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              borderRightStyle: day !== "FRI" ? "solid" : "",
              borderRightWidth: day !== "FRI" ? "thin" : "",
              borderRightColor: day !== "FRI" ? "divider" : "",
            }}
          >
            <Typography variant="caption" sx={{ pt: 1, fontWeight: 600 }}>
              {day}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
              }}
            >
              <Divider sx={{ flexGrow: 1 }} />
              {times.map((time, index) => {
                return <HourSlot key={index} day={day} time={time} />;
              })}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
