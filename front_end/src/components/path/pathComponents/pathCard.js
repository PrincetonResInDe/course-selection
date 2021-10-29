import * as React from "react";
import "../../../App.css";
import ReactDOM from "react-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import { Box, Button, IconButton } from "@mui/material";
import ClassCard from "./classCard";

export default function Path(props) {
  return (
    <Card sx={{ display: "flex", width: "100%", height: "100%" }}>
      <CardContent sx={{ width: "100%", mb: 2 }}>
        <Box // why doesn't this push the icon to the left
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ alignSelf: "center" }}>
            <Typography gutterBottom variant="h6" component="div">
              {props.title}
            </Typography>
          </Box>
          <Box>
            <IconButton>
              <CalendarViewMonthIcon />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ height: "100%", overflow: "auto" }}>
          <ClassCard />
          <ClassCard />
          <ClassCard />
          <ClassCard />
          <ClassCard />
          <ClassCard />
          <ClassCard />
          <ClassCard />
        </Box>
      </CardContent>
    </Card>
  );
}
