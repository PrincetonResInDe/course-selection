import React from "react";
import { Box, Typography, Divider } from "@mui/material";

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
    <Box sx={{ flex: "1 1 auto", border: "1px solid grey", width: "100%" }}>
      <Typography align="center">{props.day}</Typography>
      <Divider />
      <Box sx={{ display: "flex", flexDirection: "column", height: "97.5%" }}>
        {times.map((time) => {
          return (
            <Box
              sx={{
                flex: "1 1 auto",
                height: "100%",
                border: "1px solid grey",
              }}
            >
              <Typography>{props.day == "MON" ? time : ""}</Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
