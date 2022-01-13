import React from "react";
import { Box } from "@mui/material";
import AppBar from "../../shared/appBarComponent/appBar";
import TreeCard from "./treeCard";
import Typography from "@mui/material/Typography";
import majors from "../../../data/majors_and_certificates/majors/ELE.json";
export default function pathTree() {
  let major = majors;

  return (
    <Box
      sx={{ display: "flex", width: "20vw", flexDirection: "column"}}
    >
      <Box sx={{ flex: "0 1 auto", height: "5vh" }}>
        <AppBar />
      </Box>
      <Box sx={{ flex: "1 1 auto" }}>
        <Typography variant="h6" component="div">
          {major.name}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexFlow: "column",
            height: "85vh",
            mt: 2,
            alignItems: "end",
            overflow: "scroll",
          }}
          ƒ
        >
          {major.req_list.map((req) => (
            <>
              <TreeCard key={req.name} level="1" comp="yes" name={req.name} />
              {req.req_list &&
                req.req_list.map((req) => (
                  <>
                    <TreeCard
                      key={req.name}
                      level="2"
                      comp="yes"
                      name={req.name}
                    />
                    {req.course_list &&
                      req.course_list.map((course) => (
                        <TreeCard level="3" comp="class" name={course} />
                      ))}
                  </>
                ))}
            </>
          ))}

          {/* 
          <TreeCard level="1" comp="yes" />
          <TreeCard level="2" comp="no" />
          <TreeCard level="3" comp="yes" />
          <TreeCard level="1" /> */}
        </Box>
      </Box>
    </Box>
  );
}
