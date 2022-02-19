import React, {useEffect, useState} from "react";
import { Box } from "@mui/material";
import Review from "../components/review/reviewComponent/review";

export default function ReviewPage() {
    return (
      <Box sx={{ width: "65vw", mt: 2, mb: 2, mr: 2, position: "absolute", top: "1%", left: "43vh", backgroundColor: "#F2F8FF", zIndex: 2}}>
        <Review />
      </Box>
      );
}