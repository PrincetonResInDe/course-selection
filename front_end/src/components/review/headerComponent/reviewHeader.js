import React, { useState } from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import ReviewInfo from "./reviewInfo";

export default function ReviewHeader() {
    return (
        <Box
            sx={{
                display: "flex",
                flexFlow: "column",
                width: "65vw",
                m: 2,
            }}
        >
            <Box sx={{ mb: 1 }}>
                <Typography variant="h6">ORF401</Typography>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <Box>
                    <Typography variant="h6">Electronic Commerce</Typography>
                </Box>
                <Box sx={{ flex: 1, m: 1 }} />
                <Box>
                    <ReviewInfo />
                </Box>
            </Box>
        </Box>
    );
}