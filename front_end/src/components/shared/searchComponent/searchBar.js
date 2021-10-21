import React from "react";
import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  return (
    <Box sx={{ mb: 2 }}>
      <FormControl fullWidth variant="standard" sx={{ mb: 1 }}>
        <OutlinedInput
          id="input-with-icon-adornment"
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Button variant="outlined">Filters</Button>
        <Box sx={{ flex: 1, m: 1 }} />
        <Button variant="outlined">Sort By</Button>
      </Box>
    </Box>
  );
}
