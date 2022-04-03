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
import { useSearchStore } from "../../../zustand/search";

export default function SearchBar(props) {
  const [setSearchResults] = useSearchStore((state) => [
    state.setSearchResults,
  ]);

  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      setSearchResults({
        query,
        semester: "Fall 2021",
        special: "",
      });
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
