import React, { useState } from "react";
import { Box } from "@mui/material";
import SearchBar from "./searchBar";
import SearchResults from "./searchResults";
import Title from "../../shared/titleComponent/title";

export default function Search() {
  const [searchResults, setSearchResults] = useState([
    {
      code: "MAE345",
      course_num: "MAE345",
      course_name: "Intro to Robotics",
      rating: "4.15",
      distribution: ["LA", "PDF"],
      availability: ["F&S"],
      prev_offered: ["2022"],
      id: 124145,
    },
    {
      code: "ELE206",
      course_num: "ELE206",
      course_name: "Logic Design",
      rating: "4.75",
      distribution: ["LA", "PDF"],
      availability: ["F&S"],
      prev_offered: ["2022"],
      id: 324235345,
    },
  ]);

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
