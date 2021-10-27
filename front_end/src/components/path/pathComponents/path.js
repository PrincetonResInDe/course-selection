import * as React from 'react';
import "../../../App.css"
import ReactDOM from 'react-dom';
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from '@mui/material/Typography';
import PathCard from "./pathCard"
import PathTab from "./pathTab"
import Bookmarks from './bookmarks'
export default function Path() {
    var semesters = [{ title: "Fall 2021" ,courses: [ "cos126"]}]; 

    return (
        <div>
            <PathTab/>
            <div style = {{ 
                display: 'flex', 
                flexDirection: 'row',
                width: '100%' , 
                height: '45%', 
                justifyContent: 'space-around', 
                alignItems: 'center'}}> 

                <PathCard title = {semesters[0].title}/> 
                <PathCard title = {semesters[0].title}/> 
                <PathCard title = {semesters[0].title}/> 
                <PathCard title = {semesters[0].title}/> 
            </div> 

            <div style = {{ 
                display: 'flex', 
                flexDirection: 'row',
                width: '100%' , 
                height: '40%', 
                justifyContent: 'space-around'}}> 

                <PathCard title = {semesters[0].title}/> 
                <PathCard title = {semesters[0].title}/> 
                <PathCard title = {semesters[0].title}/> 
                <PathCard title = {semesters[0].title}/> 
            </div> 

            <Bookmarks />
        </div>
    );
}