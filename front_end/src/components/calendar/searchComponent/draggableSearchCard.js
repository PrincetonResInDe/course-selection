import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useDrag } from "react-dnd";
import { useCalendarStore } from "../../../zustand/calendar";

export default function DraggableSearchCard(props) {
  const [bookmarked, setBookmarked] = useState(false);
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };
  const [setHoveredClass] = useCalendarStore((state) => [
    state.setHoveredClass,
  ]);

  const data = props.data;

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
    <Box
      ref={drag}
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "background.paper",
        p: 1,
        cursor: isDragging ? "grabbing" : "grab",
        "&:hover": {
          borderRadius: 1,
          boxShadow:
            "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
        },
        borderRadius: 0,
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
    </Box>
  );
}

{
  /* <Box
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
        borderRadius: 1,
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
            display: "flex",
            flexDireciton: "row",
            alignItems: "center",
            // justifyContent: "space-between",
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
            {data.course_num}
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            {/* <Chip
              label={data.rating}
              size="small"
              sx={{
                ml: 0.5,
                mr: 0.5,
                color: gradient(data.rating),
                backgroundColor: opacity(data.rating, 0.2),
                fontSize: "12px",
                p: 0,
              }}
            /> 
          </Box>
          <Box sx={{ flex: "0 1 auto" }}>
            <IconButton
              disableRipple
              sx={{ p: 0, "&:hover": { backgroundColor: "background.paper" } }}
              onClick={() => {
                handleBookmark();
              }}
            >
              {bookmarked ? (
                <BookmarkIcon sx={{ width: "75%" }} />
              ) : (
                <BookmarkBorderIcon sx={{ width: "75%" }} />
              )}
            </IconButton>
          </Box>
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
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            pt: 0.5,
          }}
        >
          <Chip
            label={data.rating}
            size="small"
            sx={{
              ml: 0.5,
              mr: 0.5,
              color: gradient(data.rating),
              backgroundColor: opacity(data.rating, 0.2),
              fontSize: "12px",
              p: 0,
            }}
          />
          <Box
            sx={{
              backgroundColor: opacity(data.rating, 0.2),
              pl: 1,
              pr: 1,
              borderRadius: 10,
              mr: 0.5,
            }}
          >
            <Typography sx={{ color: gradient(data.rating) }}>
              {data.rating}
            </Typography>
          </Box>
          <Typography
            sx={{ ml: 0.5, mr: 0.5, color: "color.orange", fontWeight: 600 }}
          >
            LA
          </Typography>
          <Typography
            sx={{ ml: 0.5, mr: 0.5, color: "color.darkBlue", fontWeight: 600 }}
          >
            PDF
          </Typography>
          <Typography
            sx={{ ml: 0.5, mr: 0.5, color: "color.blue", fontWeight: 600 }}
          >
            100/120
          </Typography>
        </Box>
      </Box>
    </Box> */
}

{
  /* <Card
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
            display: "flex",
            flexDireciton: "row",
            justifyContent: "space-between",
            alignItems: "center",
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
            {data.course_num}
          </Typography>
          <Box sx={{ flex: "0 1 auto" }}>
            <IconButton
              disableRipple
              sx={{ p: 0, "&:hover": { backgroundColor: "background.paper" } }}
              onClick={() => {
                handleBookmark();
              }}
            >
              {bookmarked ? (
                <BookmarkIcon sx={{ width: "75%" }} />
              ) : (
                <BookmarkBorderIcon sx={{ width: "75%" }} />
              )}
            </IconButton>
          </Box>
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
    </Card> */
}
