import React, { useState, useRef } from "react";
import { Box, Typography, Divider } from "@mui/material";
import BookmarkCard from "./bookmarkCard";
import { useCalendarStore } from "../../../zustand/calendar";
import { useDrop } from "react-dnd";

export default function BookmarkList() {
  const [searchWidth] = useCalendarStore((state) => [state.searchWidth]);
  const ref = useRef(null);

  const [data, setData] = useState([]);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ["COURSE_CARD", "BOOKMARK_CARD", "SEARCH_CARD"],
    drop: (item) => {
      if (data.filter((e) => e.guid === item.guid).length === 0) {
        setData([...data, item]);
      }
      return { column: "COURSE_LIST" };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: (item) => {
      return true;
    },
  });

  // handler to change state when bookmark card is moved
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
        borderRadius: 1,
      }}
    >
      <Typography
        variant="caption"
        sx={{ pt: 0.5, textAlign: "center", fontWeight: 600 }}
      >
        BOOKMARKS
      </Typography>
      <Divider />
      <Box sx={{ flexGrow: 1, overflow: "auto", mb: 1 }}>
        <Box sx={{ height: 0 }}>
          {data.map((d, i) => {
            return (
              <BookmarkCard
                key={d.guid}
                allData={data}
                setData={setData}
                data={d}
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
