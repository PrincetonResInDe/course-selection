import React from "react";
import { Box } from "@mui/material";

export default function BookmarkCard(props) {
  var level = props.level;
  var comp = props.comp;
  return (
    <Box
      sx={{
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
        padding: 0,
      }}
    ></Box>
  );
}
