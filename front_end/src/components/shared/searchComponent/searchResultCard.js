import React from "react";
import { Box } from "@mui/material";
import { Card, CardContent, Typography } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function SearchResultCard(props) {
  return (
    <Box>
      <Draggable key={props.name} draggableId={props.name}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card sx={{ mb: 1, height: "100px" }}>
              <CardContent>
                <Typography>
                  {props.name}
                </Typography>
              </CardContent>
            </Card>
          </div>
        )}
      </Draggable>
    </Box> 
  );
}
