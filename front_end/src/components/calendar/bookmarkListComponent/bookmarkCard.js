import React, { useRef, useState } from "react";
import { Card, Typography, Box, IconButton } from "@mui/material";
import { useDrag, useDrop } from "react-dnd";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export default function BookmarkCard(props) {
  const ref = useRef(null);
  const [bookmarked, setBookmarked] = useState(true);

  // determines where to drop bookmark card
  const [, drop] = useDrop({
    accept: "BOOKMARK_CARD",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      props.moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  // makes bookmark card draggable
  const [{ isDragging }, drag] = useDrag({
    type: "BOOKMARK_CARD",
    item: {
      id: props.data.number,
      number: props.data.number,
      name: props.data.name,
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      const column = dropResult.column;

      switch (column) {
        case "BOOKMARK_LIST":
          // filter out item
          let copy = [...props.allData];
          copy = copy.filter((e) => e.id !== item.id);
          props.setData(copy);
          break;
        default:
          break;
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleBookmarked = () => {
    setBookmarked(!bookmarked);
    let copy = [...props.allData];
    copy = copy.filter((e) => e.id !== props.data.id);
    props.setData(copy);
  };

  drag(drop(ref));

  return (
    <Card
      ref={ref}
      sx={{
        display: "flex",
        flexDirection: "row",
        opacity: isDragging ? 0.4 : 1,
        m: 1,
        padding: 1,
        boxShadow: "none",
        "&:hover": {
          boxShadow:
            "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
        },
      }}
    >
      <Box
        sx={{
          flex: "0 1 auto",
          overflow: "hidden",
          display: "inline-grid",
          width: "100%",
        }}
      >
        <Box
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "100%",
            color: "color.blue",
            display: "flex",
            flexDireciton: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              color: "color.blue",
              display: "inline",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {props.data.number}
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
            {props.data.name}
          </Typography>
        </Box>
      </Box>
      <IconButton
        onClick={() => {
          handleBookmarked();
        }}
        sx={{
          "&:hover": {
            backgroundColor: "background.paper",
          },
        }}
        disableRipple
      >
        {bookmarked ? (
          <BookmarkIcon sx={{ width: "75%" }} />
        ) : (
          <BookmarkBorderIcon sx={{ width: "75%" }} />
        )}
      </IconButton>
    </Card>
  );
}
