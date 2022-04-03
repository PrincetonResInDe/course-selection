import React, { useState, useRef } from "react";
import { Box, Typography, Divider } from "@mui/material";
import CourseListCard from "./courseListCard";
import { useCalendarStore } from "../../../zustand/calendar";
import { useDrop } from "react-dnd";

export default function CourseList() {
  const [searchWidth] = useCalendarStore((state) => [state.searchWidth]);

  const [data, setData] = useState([]);

  const ref = useRef(null);

  const ref = useRef(null);

  // handler to update state of data when course list card is moved
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

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ["COURSE_CARD", "BOOKMARK_CARD", "SEARCH_CARD"],
    drop: (item) => {
      // check item not in data
      if (data.filter((e) => e.guid === item.guid).length === 0) {
        setData([...data, item]);
      }
      return { column: "BOOKMARK_LIST" };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: (item) => {
      return true;
    },
  });

  drop(ref);

  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        flexFlow: "column",
        width: searchWidth,
        height: "100%",
        backgroundColor: "white",
        borderRadius: 2,
      }}
    >
      <Typography
        variant="caption"
        sx={{ pt: 0.5, textAlign: "center", fontWeight: 600 }}
      >
        2021 SPRING
      </Typography>
      <Divider />

      <Box sx={{ flexGrow: 1, overflow: "auto", mb: 1, p: 0.5 }}>
        <Box sx={{ height: 0 }}>
          {data.map((d, i) => {
            return (
              <CourseListCard
                allData={data}
                key={d.guid}
                data={d}
                setData={setData}
                index={i}
                moveCard={moveCard}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
