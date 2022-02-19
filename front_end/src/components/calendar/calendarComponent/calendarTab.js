import React, { useState } from "react";
import { Box, Typography, IconButton, Chip, Divider } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { gradient, opacity } from "../../theme/gradient";

export default function CalendarTab(props) {
  // state to determine which tab user is on
  const [clicked, setClicked] = useState("MAIN");

  const tabs = ["MAIN", "IDEAL", "PLAN-B"];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {tabs.map((tab, index) => {
        return (
          <Box
            key={index}
            sx={{
              backgroundColor:
                clicked === tab && props.isOver
                  ? "color.lightBlue"
                  : clicked === tab
                  ? "white"
                  : "",

              pl: 1,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              borderRadius: "0",
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              "&:hover": {
                backgroundColor: "white",
              },
            }}
            onClick={() => {
              setClicked(tab);
            }}
          >
            <Typography sx={{ p: 1, pr: 3 }}>{tab} </Typography>
            <Chip
              label="4.23"
              size="small"
              sx={{
                p: 0,
                color: gradient(Math.random() * 10),
                backgroundColor: opacity(Math.random() * 10, 0.2),
              }}
            />
            <IconButton
              disableRipple
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <ClearIcon sx={{ width: "75%" }} />
            </IconButton>
            <Divider
              orientation="vertical"
              sx={{
                height: "50%",
                borderColor: clicked === tab ? "white" : "",
              }}
            />
          </Box>
        );
      })}
      <IconButton
        disableRipple
        sx={{
          "&:hover": {
            backgroundColor: "background.default",
          },
        }}
      >
        <AddOutlinedIcon sx={{ width: "75%" }} />
      </IconButton>
    </Box>
  );
}
