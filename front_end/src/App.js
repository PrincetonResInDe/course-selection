import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./views/homePage";
import AboutPage from "./views/aboutPage";
import CalendarPage from "./views/calendarPage";
import PathPage from "./views/pathPage";
import ProfilePage from "./views/profilePage";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./components/theme/theme";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/calendar" component={CalendarPage} />
          <Route exact path="/path" component={PathPage} />
          <Route path="/profile/:uid" component={ProfilePage} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
