import React from "react";
import { Box, Button, IconButton } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

export default function AppBar() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        mb: 1,
      }}
    >
      <Box>
        <Button>Path</Button>
      </Box>
      <Box>
        <Button>Calendar</Button>
      </Box>
      <Box>
        <IconButton>
          <AccountCircleOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
