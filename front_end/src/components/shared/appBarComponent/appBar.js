import React from "react";
import { Box, Button, IconButton } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

export default function AppBar(props) {
  const buttons = [
    { name: "Path", href: "/path" },
    { name: "Calendar", href: "calendar" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {buttons.map((button) => {
        return (
          <Button
            disableRipple
            disableFocusRipple
            href={button.href}
            sx={{
              borderRadius: 0,
              color: props.name === button.name ? "color.blue" : "black",
              width: "100%",
              textTransform: "none",
              "&:hover": { backgroundColor: "background.default" },
              fontWeight: props.name === button.name ? 600 : 200,
              textDecoration: props.name === button.name ? "underline" : "",
            }}
          >
            {button.name}
          </Button>
        );
      })}
      <IconButton
        disableRipple
        href="/profile"
        sx={{
          color: "black",
          "&:hover": { backgroundColor: "background.default" },
        }}
      >
        <AccountCircleOutlinedIcon sx={{ width: "75%" }} />
      </IconButton>
    </Box>
  );
}
