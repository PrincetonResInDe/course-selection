import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import BookmarkCard from "./bookmarkCard";

export default function BookmarkList() {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography align="center">BOOKMARKS</Typography>
      <Divider />
    </Box>
  );
}
