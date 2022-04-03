import React from "react";
import { Box, Typography } from "@mui/material";
import { useDrag } from "react-dnd";
import { useCalendarStore } from "../../../zustand/calendar";
import { useSearchStore } from "../../../zustand/search";

export default function DraggableSearchCard(props) {
  const [setHoveredClass] = useCalendarStore((state) => [
    state.setHoveredClass,
  ]);
  const [showReview, setShowReview] = useSearchStore((state) => [
    state.showReview,
    state.setShowReview,
  ]);
  const data = props.data;

  // handle dragging search card
  const [{ isDragging }, drag] = useDrag({
    type: "SEARCH_CARD",
    item: {
      guid: data.guid,
      catalog_title: data.catalog_title,
      title: data.title,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Box
      ref={drag}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "background.paper",
        p: 1,
        cursor: isDragging ? "grabbing" : "grab",
        "&:hover": {
          boxShadow: "2px 2px 3px rgb(0 0 0 / 50%)",
          borderRadius: 1,
        },
        borderTopLeftRadius: "4px",
        borderTopRightRadius: "4px",
      }}
      onMouseEnter={() => {
        setHoveredClass(data);
      }}
      onMouseLeave={() => {
        setHoveredClass({});
      }}
      onClick={() => {
        if (Object.values(showReview).length === 0 || showReview !== data) {
          setShowReview(data);
        } else {
          setShowReview({});
        }
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
            {data.catalog_title}
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
            {data.title}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
