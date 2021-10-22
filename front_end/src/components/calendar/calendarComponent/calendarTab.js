import React from "react";
import { Box, Button, IconButton } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

export default function CalendarTab() {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Button>MASTER</Button>
      <Button>IDEAL</Button>
      <Button>PLAN-B</Button>
      <IconButton>
        <AddOutlinedIcon />
      </IconButton>
    </Box>
  );
}
