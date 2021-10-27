import React from "react";
import { Box } from "@mui/material";

export default function BookmarkCard(props) {
    var level = props.level; 
  return (
    <Box
      sx={{
        m: 0.2,
        backgroundColor: level == 1? '#D1E7E4' : level == '2' ? 'blue' : 'red',
        height: "30px",
        width: level == '1'? "100%" : level == '2' ? "90%" : "80%", 
        borderRadius: 1.5,
        padding: 0,
      }}
    >
    </Box>
  );
}
