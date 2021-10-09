import * as React from 'react';
import "../../../App.css"
import ReactDOM from 'react-dom';
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from '@mui/material/Typography';
import PathCard from "./pathCard"

export default function Path() {
    let semesters = {"fall2020" : ["cos126"]}; 
    return (
        <div>
            <div style = {{ display: 'flex', flexDirection: 'row',  justifyContent: 'space-around'}}> 
                <PathCard /> 
                <PathCard /> 
                <PathCard /> 
                <PathCard /> 
            </div> 

            <div className = "row"> 
                <PathCard /> 
                <PathCard /> 
                <PathCard /> 
                <PathCard /> 
            </div> 
        </div>
    );
}