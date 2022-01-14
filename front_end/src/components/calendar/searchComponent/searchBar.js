import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

export default function SearchBar(props) {
  const data = [
    {
      id: "MAT 203",
      number: "MAT 203",
      name: "Advanced Math",
      course_num: "MAT 203",
      course_name: "Advanced Math",
      rating: "4.75",
      distribution: ["LA", "PDF"],
      availability: ["F&S"],
      prev_offered: ["2022"],
    },
    {
      id: "COS 126 / COS 109",
      name: "Computer Science: An Interdisciplinary Approach",
      number: "COS 126 / COS 109",
      course_num: "COS 126 / COS 109",
      course_name: "Computer Science: An Interdisciplinary Approach",
      rating: "4.75",
      distribution: ["LA", "PDF"],
      availability: ["F&S"],
      prev_offered: ["2022"],
    },
    {
      id: "COS 240",
      number: "COS 240",
      name: "Reasoning About Computation",
      course_num: "COS 240",
      course_name: "Reasoning About Computation",
      rating: "4.75",
      distribution: ["LA", "PDF"],
      availability: ["F&S"],
      prev_offered: ["2022"],
    },
  ];

  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    if (e.keyCode === 13) {
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="outlined"
          size="small"
          sx={{
            backgroundColor: "white",
            color: "black",
            textTransform: "none",
            border: "1px solid #D4D4D4",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              height: "100%",
            }}
          >
            <FilterAltOutlinedIcon sx={{ height: "75%" }} />
            <Typography sx={{ pl: 0.5 }}>Filters</Typography>
          </Box>
        </Button>
        <Button
          variant="outlined"
          size="small"
          sx={{
            backgroundColor: "white",
            color: "black",
            textTransform: "none",
            border: "1px solid #D4D4D4",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CompareArrowsIcon
              sx={{ height: "75%", transform: "rotate(90deg)" }}
            />
            <Typography sx={{ pl: 0.5 }}>Sort By</Typography>
          </Box>
        </Button>
      </Box>
    </Box>
  );
}
