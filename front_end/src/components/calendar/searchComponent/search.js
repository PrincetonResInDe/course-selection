import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import SearchBar from "./searchBar";
import SearchResults from "./searchResults";
import Title from "../../shared/titleComponent/title";
import { useResizeDetector } from "react-resize-detector";
import { useCalendarStore } from "../../../zustand/calendar";

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [setSearchWidth] = useCalendarStore((state) => [state.setSearchWidth]);
  const { width, _, ref } = useResizeDetector();

  useEffect(() => {
    setSearchWidth(width);
  }, [width]);

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
        <SearchBar setSearchResults={setSearchResults} />
      </Box>
      <Box
        ref={ref}
        sx={{
          flex: "1 1 auto",
          overflow: "auto",
        }}
      >
        <SearchResults results={searchResults} />
      </Box>
    </Box>
  );
}
