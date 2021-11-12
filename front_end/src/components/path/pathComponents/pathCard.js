import React, { useState } from "react";
import "../../../App.css";
import ReactDOM from "react-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import { Box, Button, IconButton } from "@mui/material";
import ClassCard from "./classCard";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default function PathCard(props) {
  const results = props.classes;
  const semIndex = props.semIndex;
  // const semId = `sem${semIndex}`;
  // const className = "semester";
  // if (this.props.className) className += ` ${this.props.className}`;

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

        <Box sx={{ height: "100%", overflow: "auto" }}
        onMouseEnter = {()=> console.log("mouseEnter" + semIndex)}>
          <Droppable key={semIndex} droppableId={semIndex}>
            {(provided) => (
              <div
                className="searchBar"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {results.map((result) => (
                  <ClassCard
                    name={result}
                    className={result}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Box>
      </CardContent>
    </Card>
  );
}
