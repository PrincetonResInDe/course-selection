import React, { useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import BookmarkCard from "./bookmarkCard";
import { useCalendarStore } from "../../../zustand/calendar";

export default function BookmarkList() {
  const [searchWidth] = useCalendarStore((state) => [state.searchWidth]);

  const [data, setData] = useState([
    { id: 1, number: "MAT 202", name: "Linear Algebra" },
    {
      id: 2,
      number: "COS 126",
      name: "Computer Science: An Interdisciplinary Approach",
    },
    { id: 3, number: "NEU 201", name: "Introduction to Neuroscience" },
    { id: 4, number: "MAT 202", name: "Linear Algebra" },
    {
      id: 5,
      number: "COS 126",
      name: "Computer Science: An Interdisciplinary Approach",
    },
    { id: 6, number: "NEU 201", name: "Introdcution to Neuroscience" },
    { id: 7, number: "MAT 202", name: "Linear Algebra" },
    {
      id: 8,
      number: "COS 126",
      name: "Computer Science: An Interdisciplinary Approach",
    },
    { id: 9, number: "NEU 201", name: "Introdcution to Neuroscience" },
  ]);

  const moveCard = (dragIndex, hoverIndex) => {
    const dragItem = data[dragIndex];

    if (dragItem) {
      setData((prevState) => {
        const copy = [...prevState];
        const prevItem = copy.splice(hoverIndex, 1, dragItem);
        copy.splice(dragIndex, 1, prevItem[0]);

        return copy;
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column",
        width: `calc(${searchWidth}px + 16px)`,
        height: "100%",
        backgroundColor: "white",
        borderRadius: 1,
      }}
    >
      <Typography
        variant="caption"
        sx={{ pt: 1, textAlign: "center", fontWeight: 600 }}
      >
        BOOKMARKS
      </Typography>
      <Divider />
      <Box sx={{ flexGrow: 1, overflow: "auto", mb: 1 }}>
        <Box sx={{ height: 0 }}>
          {data.map((d, i) => {
            return (
              <BookmarkCard key={d.id} data={d} index={i} moveCard={moveCard} />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
