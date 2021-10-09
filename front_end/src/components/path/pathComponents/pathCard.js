import * as React from 'react';
import "../../../App.css"
import ReactDOM from 'react-dom';
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from '@mui/material/Typography';

export default function Path() {
    return(
        <Card sx={{ maxWidth: 345 }} > 
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Semester
                </Typography>
            </CardContent>
        </Card>
    );
}