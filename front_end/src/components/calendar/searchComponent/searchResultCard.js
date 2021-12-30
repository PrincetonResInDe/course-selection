import React, { useCallback } from "react";
import { Box, Card, CardContent, Typography, Chip } from "@mui/material";
import { gradient, opacity } from "../../theme/gradient";
import DraggableSearchCard from "./draggableSearchCard";

export default function SearchResultCard(props) {
  const data = props.data;

  return (
    <Card
      sx={{
        mb: 1,
        backgroundColor: "white",
        width: "100%",
      }}
    >
      <CardContent
        sx={{
          p: 1,
          "&:last-child": {
            paddingBottom: 1,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
            }}
          >
            <DraggableSearchCard data={data} />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            pt: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Chip
              label={data.rating}
              size="small"
              sx={{
                fontWeight: "bold",
                color: gradient(data.rating),
                backgroundColor: opacity(data.rating, 0.3),
              }}
            />
            {data.distribution.map((distribution) => {
              return (
                <Typography
                  sx={{ ml: 0.5, color: "color.orange", fontWeight: "bold" }}
                >
                  {distribution}
                </Typography>
              );
            })}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography
              sx={{ mr: 1, color: "color.darkBlue", fontWeight: "bold" }}
            >
              {data.availability}
            </Typography>
            <Typography sx={{ color: "color.grey" }}>
              Previously Offered {data.prev_offered}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
