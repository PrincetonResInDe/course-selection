import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import BookmarkCard from "./bookmarkCard";
import { useCalendarStore } from "../../../zustand/calendar";

export default function BookmarkList() {
  const [searchWidth] = useCalendarStore((state) => [state.searchWidth]);

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column",
        width: `calc(${searchWidth}px + 16px)`,
        height: "100%",
        backgroundColor: "white",
        borderRadius: 1,
      }}
    >
      <Typography
        variant="caption"
        sx={{ pt: 1, textAlign: "center", fontWeight: 600 }}
      >
        BOOKMARKS
      </Typography>
      <Divider />
      <Box sx={{ flexGrow: 1, overflow: "auto", mb: 1 }}>
        <Box sx={{ height: 0 }}>
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
    </Box>
  );
}
