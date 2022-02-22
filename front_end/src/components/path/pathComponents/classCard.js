import React from "react";
import { Box } from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Typography from "@mui/material/Typography";
import { height } from "@mui/system";
import { useDrag } from "react-dnd";

export default function ClassCard(props) {
  const course = props.class;
  const data = props.class; 


  const [{ isDragging }, drag] = useDrag({
    type: "SEARCH_CARD",
    item: {
      id: data.course_name,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Draggable key={course.code} draggableId={course.code} index = {props.index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
        <Box
            ref={drag}
            sx={{
              width: "14vw",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "background.paper",
              p: 1,
              mb: 0.5, 
              cursor: isDragging ? "grabbing" : "grab",
              "&:hover": {
                borderRadius: 1,
                boxShadow:
                  "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
              },
              borderRadius: 0,
            }}
            // onMouseEnter={() => {
            //   setHoveredClass(data);
            // }}
            // onMouseLeave={() => {
            //   setHoveredClass({});
            // }}
          >
            <Box
              sx={{
                flex: "0 1 auto",
                overflow: "hidden",
                display: "inline-grid",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  width: "100%",
                  color: "color.blue",
                  display: "flex",
                  flexDireciton: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    color: "color.blue",
                    display: "inline",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {data.course_num}
                </Typography>
              </Box>
              <Box
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  color: "color.blue",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "color.blue",
                    display: "inline",
                  }}
                >
                  {data.course_name}
                </Typography>
              </Box>
            </Box>
          </Box>
        </div>
      )}
    </Draggable>
  );
}
