import React from "react";
import { Box, Button, IconButton } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

export default function ReviewTab() {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", mb: 1 , width: "65vw"}}>
      <Button>Spring 2021</Button>
      <Button>Fall 2020</Button>
      <Button>Spring 2020</Button>
    </Box>
  );
}
