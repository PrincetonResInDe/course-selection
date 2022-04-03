import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import SearchBar from "./searchBar";
import SearchResultCard from "./searchResultCard";
import Title from "../../shared/titleComponent/title";
import { useResizeDetector } from "react-resize-detector";
import { useCalendarStore } from "../../../zustand/calendar";
import { useSearchStore } from "../../../zustand/search";
import DraggableSearchCard from "./draggableSearchCard";

export default function Search(props) {
  const [searchResults] = useSearchStore((state) => [state.searchResults]);
  const [setSearchWidth] = useCalendarStore((state) => [state.setSearchWidth]);
  const { width, ref } = useResizeDetector();

  // update searchWidth on load to determine width of courselist and bookmarks
  useEffect(() => {
    setSearchWidth(width);
  }, [width, setSearchWidth]);

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column",
        width: "15vw",
        m: 2,
      }}
    >
      <Box>
        <Title />
      </Box>
      <Box sx={{ flex: "0 1 auto" }}>
        <SearchBar />
      </Box>
      <Box
        ref={ref}
        sx={{
          flex: "1 1 auto",
          overflow: "auto",
        }}
      >
        {searchResults.map((result) => {
          return <SearchResultCard data={result} key={result.course_id}  {...props}/>;
        })}
      </Box>
    </Box>
  );
}
