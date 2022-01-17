import React, { useState } from "react";
import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";
import { gradient, opacity } from "../../theme/gradient";
import DraggableSearchCard from "./draggableSearchCard";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function SearchResultCard(props) {
  // state to determine whether course is bookmarked
  const [bookmarked, setBookmarked] = useState(false);
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const data = props.data;

  return (
    <Card
      sx={{
        mb: 1,
        backgroundColor: "white",
        width: "100%",
      }}
    >
      <CardContent
        sx={{
          p: 0.5,
          "&:last-child": {
            paddingBottom: 0.5,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
            }}
          >
            <DraggableSearchCard data={data} />
          </Box>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            pt: 0.5,
          }}
        >
          <Box
            sx={{
              backgroundColor: opacity(data.rating, 0.2),
              pl: 1,
              pr: 1,
              borderRadius: 10,
              mr: 0.5,
              ml: 1,
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
          <Box sx={{ flexGrow: 1 }}></Box>
          <IconButton
            sx={{ p: 0, "&:hover": { backgroundColor: "white" } }}
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
      </CardContent>
    </Card>
  );
}
