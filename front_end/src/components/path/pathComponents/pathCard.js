import * as React from 'react';
import "../../../App.css"
import ReactDOM from 'react-dom';
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from '@mui/material/Typography';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import { Box, Button, IconButton } from "@mui/material";
import ClassCard from "./classCard"

export default function Path(props) {
    return(
        <Card sx={{ display: 'flex', width: '100%', height: '42vh'}} > 
            <CardContent>
                <Box // why doesn't this push the icon to the left
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        height: '5vh',
                    }}> 
                    <Typography gutterBottom variant="h6" component="div">
                        {props.title}
                    </Typography>
                    <IconButton>
                    <CalendarViewMonthIcon />
                    </IconButton>
                </Box> 
                <ClassCard/>
                <ClassCard/>
                <ClassCard/>
                <ClassCard/>
                <ClassCard/>


            </CardContent>
        </Card>
    );
}