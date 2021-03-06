import React from "react";
import { Box } from "@mui/material";
import { getThemeProps, useThemeProps } from "@mui/system";

export default function TreeCard(props) {
  var level = props.level;
  var comp = props.comp;
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        m: 0.2,
        backgroundColor:
          comp === "yes"
            ? "#D1E7E4"
            : comp === "no"
            ? "#F6E1E1"
            : comp === "class"
            ? "white"
            : "#FBF7D2",
        height: "30px",
        width: level === "1" ? "100%" : level === "2" ? "90%" : "80%",
        borderRadius: 1.5,
        padding: 0.8,
      }}
    >
      {props.name}
    </Box>
  );
}
