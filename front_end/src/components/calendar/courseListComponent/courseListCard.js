import React, { useRef } from "react";
import { Typography, Box, IconButton, Checkbox } from "@mui/material";
import { useDrag, useDrop } from "react-dnd";
import ClearIcon from "@mui/icons-material/Clear";

export default function CourseListCard(props) {
  const ref = useRef(null);

  // hook to make course list card draggable
  const [{ isDragging }, drag] = useDrag({
    type: "COURSE_CARD",
    item: {
      id: props.data.number,
      number: props.data.number,
      name: props.data.name,
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (!dropResult) {
        return;
      }
      const column = dropResult.column;

      switch (column) {
        case "COURSE_LIST":
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

  // hook to determine where to drop card
  const [, drop] = useDrop({
    accept: "COURSE_CARD",
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
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
  });

  const handleXButton = () => {
    let copy = [...props.allData];
    copy = copy.filter((e) => e.id !== props.data.id);
    props.setData(copy);
  };

  drag(drop(ref));

  return (
    <Box
      ref={ref}
      sx={{
        opacity: isDragging ? 0.4 : 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "background.paper",
        p: 1,
        cursor: isDragging ? "grabbing" : "pointer",
        mb: 0.5,
        borderRadius: 1,
        "&:hover": {
          borderRadius: 1,
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
      {/* <Checkbox sx={{ width: "75%" }}></Checkbox> */}
      <IconButton
        disableRipple
        onClick={() => {
          handleXButton();
        }}
        sx={{ "&:hover": { backgroundColor: "Background.paper" } }}
      >
        <ClearIcon sx={{ width: "75%" }} />
      </IconButton>
    </Box>
  );
}
