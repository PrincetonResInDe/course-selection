import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    background: {
      default: "#F1F2F2",
      paper: "#F2F8FF",
    },
    color: {
      blue: "#375C92",
      darkBlue: "#0834A4",
      lightBlue: "#e6f9ff",
      grey: "#AAAAAA",
      orange: "#FFCA7B",
    },
  },
  typography: {
    body1: {
      fontSize: "12px",
    },
    body2: {
      fontSize: "10px",
    },
  },
});

export default theme;
