import React, { useState } from "react";
import "../../../App.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import { Box, IconButton } from "@mui/material";
import ClassCard from "./classCard";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default function PathCard(props) {
  const results = props.classes;
  const semIndex = props.semIndex;
  console.log("semIndex", semIndex);
  // const semId = `sem${semIndex}`;
  // const className = "semester";
  // if (this.props.className) className += ` ${this.props.className}`;

  return (
    <Card
      sx={{
        display: "flex",
        width: "17vw",
        height: "100%",
        backgroundColor: "white",
        m: 0.1, 
      }}
    >
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

        <Box sx={{ display: "flex", flex: 1, height: "100%", width: "100%" }}>
          <Droppable key={semIndex} droppableId={"sem" + semIndex}>
            {(provided) => (
              <div
                className="searchBar"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  height: "100%",
                  width: "100%",
                }}
              >
                {results.map((result, idx) => (
                  <ClassCard
                    class = {result}
                    index = {idx}
                    name={result.course_name}
                    className={result.course_name}
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
