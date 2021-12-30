import React, { useState } from "react";
import { Box } from "@mui/material";
import SearchBar from "./searchBar";
import SearchResults from "./searchResults";
import Title from "../../shared/titleComponent/title";

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column",
        width: "20vw",
        m: 2,
      }}
    >
      <Box>
        <Title />
      </Box>
      <Box sx={{ flex: "0 1 auto" }}>
        <SearchBar setSearchResults={setSearchResults} />
      </Box>
      <Box sx={{ flex: "1 1 auto", overflow: "auto" }}>
        <SearchResults results={searchResults} />
      </Box>
    </Box>
  );
}
