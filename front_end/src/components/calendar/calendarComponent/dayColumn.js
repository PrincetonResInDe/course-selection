import React from "react";
import { Box, Typography, Divider, Card } from "@mui/material";
import ClassCards from "./classCards";

export default function DayColumn(props) {
  const times = [
    "8AM",
    "9AM",
    "10AM",
    "11AM",
    "12PM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM",
    "6PM",
    "7PM",
    "8PM",
    "9PM",
    "10PM",
    "11PM",
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: "1 1 auto",
        width: "100%",
        borderColor: "rgba(0, 0, 0, 0.12)",
        borderRightStyle: props.day !== "FRI" ? "solid" : "none",
        borderWidth: "1px",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography align="center">{props.day}</Typography>
      </Box>
      <Divider />
      <Box
        id="calendar_box"
        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        {times.map(() => {
          return (
            <Box
              sx={{
                flex: "1 1 auto",
                height: "100%",
                width: "100%",
              }}
            >
              <Divider />
            </Box>
          );
        })}
        <ClassCards />
      </Box>
    </Box>
  );
}
