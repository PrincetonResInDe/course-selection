import React, { useState } from "react";
import { Card, Box, Typography, IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useDrag } from "react-dnd";
import { useCalendarStore } from "../../../zustand/calendar";

export default function DraggableSearchCard(props) {
  const data = props.data;
  const [bookmarked, setBookmarked] = useState(false);
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const setHoveredClass = useCalendarStore((state) => state.setHoveredClass);

  // handle dragging search card
  const [{ isDragging }, drag] = useDrag({
    type: "SEARCH_CARD",
    item: {
      id: data.course_name,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Card
      ref={drag}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "background.paper",
        p: 1,
        boxShadow: "none",
        "&:hover": {
          boxShadow:
            "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
        },
      }}
      onMouseEnter={() => {
        setHoveredClass(data);
      }}
      onMouseLeave={() => {
        setHoveredClass({});
      }}
    >
      <Box
        sx={{
          flex: "0 1 auto",
          overflow: "hidden",
          display: "inline-grid",
        }}
      >
        <Box
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "100%",
            color: "color.blue",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              color: "color.blue",
              display: "inline",
            }}
          >
            {data.course_num}
          </Typography>
        </Box>
        <Box
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: "color.blue",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "color.blue",
              display: "inline",
            }}
          >
            {data.course_name}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ flex: "0 1 auto" }}>
        <IconButton
          sx={{ p: 0 }}
          onClick={() => {
            handleBookmark();
          }}
        >
          {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
      </Box>
    </Card>
  );
}
