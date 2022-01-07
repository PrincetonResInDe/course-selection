import React, { useEffect, useState } from "react";
import { Box, Card } from "@mui/material";

export default function ClassCards(props) {
  const [inset, setInset] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");

  useEffect(() => {
    let calendarBox = document.querySelector("#calendar_box");
    let calendarHeight = calendarBox.offsetHeight;
    let calendarWidth = calendarBox.offsetWidth;
    let height = calendarHeight / 20;
    let width = calendarWidth - 10;

    setHeight(`${height}px`);
    setWidth(`${width}px`);
    let top = (1 / 16) * calendarHeight;

    setInset(`${0}px 0px`);
  }, [height, width]);

  return (
    <Box sx={{ position: "absolute" }}>
      <Card
        sx={{
          height: height,
          width: width,
          position: "relative",
          inset: inset,
          zIndex: "1",
        }}
      >
        Linear Algebra
      </Card>
    </Box>
  );
}
