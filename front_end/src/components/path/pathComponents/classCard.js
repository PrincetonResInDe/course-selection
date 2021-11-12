import React from "react";
import { Box } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function ClassCard(props) {
  return (
    <Draggable key={props.name } draggableId={props.name} index = {parseInt(props.name[3])}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          <Box
            sx={{
              m: 0.5,
              backgroundColor: "purple",
              height: "40px",
              minWidth: "150px",
              borderRadius: 1.5,
              padding: 1,
              flex: "1 1 auto",
            }}
          >
            {props.name}
          </Box>
        </div>
      )}
    </Draggable>
  );
}
