import React from "react";
import { Box, CssBaseline } from "@mui/material";
import AppBar from "../../shared/appBarComponent/appBar";
import TreeCard from "./treeCard";

export default function pathTree() {
  return (
    <Box>
      <Box sx={{ flex: "0 1 auto", height: "10%" }}>
        <AppBar />
      </Box>
      <Box sx={{ flex: "1 1 auto", height: "95%" }}>
        <Box
          sx={{
            display: "flex",
            flexFlow: "column",
            height: "100%",
            mt: 3,
            alignItems: "end",
          }}
        >
          <TreeCard level="1" comp="yes" />
          <TreeCard level="2" comp="no" />
          <TreeCard level="3" comp="yes" />
          <TreeCard level="1" />
        </Box>
      </Box>
    </Box>
  );
}
