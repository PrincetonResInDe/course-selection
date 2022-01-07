import React from "react";
import { Card, Typography, Box } from "@mui/material";

export default function BookmarkCard() {
  return (
    <Card
      sx={{
        m: 1,
        padding: 1,
        boxShadow: "none",
        "&:hover": {
          boxShadow:
            "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            variant="body1"
            sx={{ color: "color.blue", fontWeight: "bold" }}
          >
            MAT202
          </Typography>
          <Typography variant="body1" sx={{ color: "color.blue" }}>
            Linear Algebra
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
