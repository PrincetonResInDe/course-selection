import React from "react";
import { Box } from "@mui/material";
import SearchResultCard from "./searchResultCard";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default function SearchResults(props) {


  const results = props.results; 
  return (
    <Box>
      {results.map((result, idx) => (
        <Droppable droppableId="searchBar" key = {0} >
          {(provided) => (
            <div
              className="searchBar"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <SearchResultCard
                data={result}
                index = {idx}
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
