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
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "100%",
            color: "color.blue",
            display: "flex",
            flexDireciton: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              color: "color.blue",
              display: "inline",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            MAT 202
          </Typography>
        </Box>
        <Box
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: "color.blue",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "color.blue",
              display: "inline",
            }}
          >
            Linear Algebra
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
