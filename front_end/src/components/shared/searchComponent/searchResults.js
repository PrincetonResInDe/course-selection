import React from "react";
import { Box } from "@mui/material";
import SearchResultCard from "./searchResultCard";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default function SearchResults() {
  const results = ["COS126", "MAE345", "ELE206"];
  return (
    <Box>
      {results.map((result) => (
        <Droppable droppableId="searchBar" key = {0} >
          {(provided) => (
            <div
              className="searchBar"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <SearchResultCard
                name={result}
                className={result}
                {...provided.droppableProps}
                ref={provided.innerRef}
              />
                 {provided.placeholder}
            </div>
          )}
       
        </Droppable>
      ))}
    </Box>
  );
}
