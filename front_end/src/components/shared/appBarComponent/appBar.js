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
        <Button href="/path" sx={{ height: "100%" }}>
          Path
        </Button>
      </Box>
      <Box>
        <Button href="/calendar" sx={{ height: "100%" }}>
          Calendar
        </Button>
      </Box>
      <Box>
        <IconButton href="/profile" sx={{ height: "100%" }}>
          <AccountCircleOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
