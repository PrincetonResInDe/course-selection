import * as React from "react";
import "../../../App.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Box, Icon } from "@mui/material";
import ClassCard from "./classCard";

export default function Path(props) {
  const bookmarKs = ["EGR395"];
  return (
    <Card sx={{ display: "flex", width: "100%", height: "20vh" }}>
      <CardContent sx={{ mb: 2 }}>
        <Box // why doesn't this push the icon to the left
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            height: "5vh",
          }}
        >
          <Typography gutterBottom variant="h6" component="div">
            Bookmarks
          </Typography>
          <Icon>
            <BookmarkBorderIcon />
          </Icon>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            height: "100%",
            overflow: "auto",
          }}
        >
          {/* <ClassCard />
          <ClassCard />
          <ClassCard />
          <ClassCard />
          <ClassCard />
          <ClassCard />
          <ClassCard />
          <ClassCard />
          <ClassCard />
          <ClassCard /> */}
        </Box>
      </CardContent>
    </Card>
  );
}
