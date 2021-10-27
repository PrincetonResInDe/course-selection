import * as React from 'react';
import "../../../App.css"
import ReactDOM from 'react-dom';
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from '@mui/material/Typography';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Box, Button, Icon} from "@mui/material";
import ClassCard from "./classCard"

export default function Path(props) {
    return(
        <Card sx={{ display: 'flex', width: '100%', height: '20vh'}} > 
            <CardContent>
             
                <Box // why doesn't this push the icon to the left
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        height: '5vh'
                    }}> 
                    <Typography gutterBottom variant="h6" component="div">
                        Bookmarks
                    </Typography>
                    <Icon>
                    <BookmarkBorderIcon />
                    </Icon>
                    
                </Box> 
                <Box sx = {{display: 'flex', width: '100%', flexDirection: 'row'}}> 
                    <ClassCard/>
                    <ClassCard/>
                    <ClassCard/>
                    <ClassCard/>
                    <ClassCard/>
                </Box> 


            </CardContent>
        </Card>
    );
}