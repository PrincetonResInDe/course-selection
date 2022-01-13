import React from "react";
import { Box } from "@mui/material";
import SearchResultCard from "./searchResultCard";

export default function SearchResults(props) {
  return (
    <Box>
      {props.results.map((result, index) => {
        return <SearchResultCard data={result} key={index} />;
      })}
    </Box>
  );
}
