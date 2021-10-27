import React from "react";
import { Box, CssBaseline } from "@mui/material";
import AppBar from "../../shared/appBarComponent/appBar";
import TreeCard from "./treeCard"

export default function pathTree() {
    return (
        <Box> 
            <Box sx={{ flex: "0 1 auto", height: "10%" }}>
            <AppBar />
            </Box>
            <Box sx={{ flex: "1 1 auto", height: "95%" }}>
            <Box sx={{ display: "flex", 
                        flexFlow: "column",
                        height: "100%",
                        justifyContent: 'flex-end'
                        }}>
                    
                <TreeCard level = '1'/> 
                <TreeCard level = '2'/>
                <TreeCard level = '3'/>  
                
            </Box>
            </Box>
        </Box> 
    ); 
}