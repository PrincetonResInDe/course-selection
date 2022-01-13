import React from "react";
import { Box } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Typography from "@mui/material/Typography";
import { height } from "@mui/system";

export default function ClassCard(props) {
  const course = props.class;
  return (
    <Draggable key={course.code} draggableId={course.code} index={course.id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          <Box
            style={{
              display: "flex",
              flex: "1",
              flexDirection: "column",
              backgroundColor: "#D7E4F4",
              height: "45px",
              width: "15vw",
              borderRadius: 5,
              m: 1,
              padding: 1,
            }}
          >
            <Typography
             gutterBottom
              variant="h9"
              component="div"
              sx={{
                display: "flex",
                flex: "1",
                color: "#315893",
                noWrap: true,
                fontWeight: 700,
                mb: 0,
               
              }}
            >
              {course.course_num}
            </Typography>
            <br />

            <Typography
            gutterBottom
              variant="h9"
              component="div"
              noWrap
              sx={{
                display: "flex",
                flex: "1",
                color: "#315893",
                fontWeight: 400,
                mt: -2,
              }}
            >
              {course.course_name}
            </Typography>
          </Box>
        </div>
      )}
    </Draggable>
  );
}
