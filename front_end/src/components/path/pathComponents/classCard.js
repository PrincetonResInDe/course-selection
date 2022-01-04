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
            style={{
              display: 'flex', 
              flex: "1 1 auto",
              margin: 1,
              backgroundColor: "purple",
              height: '40px',
              width: "100%", 
              borderRadius: 5, 
              padding: 5,
            }}
          >
            {props.name}
          </Box>
        </div>
      )}
    </Draggable>
  );
}
