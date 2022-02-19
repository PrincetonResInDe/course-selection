import React from "react";
import { Box } from "@mui/material";
import ReviewHeader from "../headerComponent/reviewHeader";
import ReviewTab from "./reviewTab";
import Rating from "./rating";
import QandA from "./q&a";
import CourseDescription from "./courseDescription";
import Grading from "./grading";
import Assignments from "./assignments";
import Instructors from "./instructors"

export default function Review(){
    return (
        <Box
          sx={{ display: "flex", flexDirection: "column", height: "41vw" ,width: "65vw", mt: 2, mb: 2, mr: 2}}
        >
          <ReviewHeader />
          <Box sx={{ display: "flex", flexDirection: "column", height: "100%", m: 1, width: "65vw"}}>
            <ReviewTab />
            <Box sx={{ display: "flex", flexDirection: "row", height: "100%", width: "65vw"}}>
                <Box sx={{ display: "flex", flexDirection: "column", width: "32vw", height: "100%"}}>
                    <Rating />
                    <QandA />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", width: "32vw", height: "100%"}}>
                    <CourseDescription />
                    <Grading />
                    <Assignments />
                    <Instructors />
                </Box>
            </Box>
          </Box>
        </Box>
      );
}