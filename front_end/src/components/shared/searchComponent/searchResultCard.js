import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function SearchResultCard() {
  return (
    <Card sx={{ mb: 1, height: "100px" }}>
      <CardContent>
        <Typography>COS 126/ COS 109</Typography>
        <Typography>Computer Science: An Interdisciplinary Approach</Typography>
      </CardContent>
    </Card>
  );
}
