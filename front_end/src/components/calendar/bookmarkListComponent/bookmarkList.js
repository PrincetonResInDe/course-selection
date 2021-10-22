import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import BookmarkCard from "./bookmarkCard";

export default function BookmarkList() {
  return (
    <Box sx={{ display: "flex", flexFlow: "column", height: "100%" }}>
      <Box sx={{ flex: "0 1 auto" }}>
        <Typography align="center">BOOKMARKS</Typography>
        <Divider />
      </Box>
      <Box sx={{ flex: "1 1 auto", overflow: "auto" }}>
        <BookmarkCard />
        <BookmarkCard />
        <BookmarkCard />
        <BookmarkCard />
        <BookmarkCard />
        <BookmarkCard />
        <BookmarkCard />
        <BookmarkCard />
        <BookmarkCard />
        <BookmarkCard />
      </Box>
    </Box>
  );
}
