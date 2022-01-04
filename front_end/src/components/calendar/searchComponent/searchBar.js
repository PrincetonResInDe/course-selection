import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar(props) {
  const data = [
    {
      course_num: "COS 126 / COS 109",
      course_name: "Computer Science: An Interdisciplinary Approach",
      rating: "4.75",
      distribution: ["LA", "PDF"],
      availability: ["F&S"],
      prev_offered: ["2022"],
    },
    {
      course_num: "COS 126 / COS 109",
      course_name: "Computer Science: An Interdisciplinary Approach",
      rating: "4.75",
      distribution: ["LA", "PDF"],
      availability: ["F&S"],
      prev_offered: ["2022"],
    },
    {
      course_num: "COS 126 / COS 109",
      course_name: "Computer Science: An Interdisciplinary Approach",
      rating: "4.75",
      distribution: ["LA", "PDF"],
      availability: ["F&S"],
      prev_offered: ["2022"],
    },
  ];

  const [query, setQuery] = useState("");
  const handleSearch = (e) => {
    if (e.keyCode == 13) {
      props.setSearchResults(data);
    }
  };

  return (
    <Box sx={{ mb: 1 }}>
      <FormControl
        fullWidth
        variant="standard"
        type="submit"
        sx={{ mb: 1 }}
        onSubmit={() => {
          handleSearch("hello");
        }}
      >
        <OutlinedInput
          fullWidth
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          sx={{ p: 1.5, borderRadius: 1, backgroundColor: "white" }}
          inputProps={{
            sx: {
              padding: 0,
            },
          }}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onKeyDown={(e) => {
            handleSearch(e);
          }}
        />
      </FormControl>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Button
          variant="outlined"
          sx={{ fontSize: "body1.fontSize", p: 1, backgroundColor: "white" }}
        >
          Filters
        </Button>
        <Box sx={{ flex: 1, m: 1 }} />
        <Button
          variant="outlined"
          sx={{ fontSize: "body1.fontSize", p: 1, backgroundColor: "white" }}
        >
          Sort By
        </Button>
      </Box>
    </Box>
  );
}
