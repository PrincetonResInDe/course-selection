import React from "react";
import { Box, Card, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useResizeDetector } from "react-resize-detector";

export default function ClassCard(props) {
  const { _, height, ref } = useResizeDetector();

  let initialHeight = props.height;

  return (
    <Card
      sx={{
        position: "absolute",
        width: "98%",
        height: initialHeight,
        zIndex: 1,
      }}
      ref={ref}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ pl: 1 }}>
          <Typography variant="caption">Linear Algebra</Typography>
        </Box>
        <Box
          sx={{
            textAlign: "right",
          }}
        >
          <IconButton sx={{ padding: 0 }}>
            <CloseIcon sx={{ width: "50%", color: "white" }} />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}
