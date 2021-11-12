import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./views/homePage";
import AboutPage from "./views/aboutPage";
import CalendarPage from "./views/calendarPage";
import PathPage from "./views/pathPage";
import { DragDropContext } from 'react-beautiful-dnd';

function App() {
  return (
    <DragDropContext>
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/calendar" component={CalendarPage} />
        <Route exact path="/path" component={PathPage} />
      </Switch>
    </Router>
    </DragDropContext>
  );
}

export default App;
