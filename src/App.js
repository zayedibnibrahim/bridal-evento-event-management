import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Components/Home/Home';
import Dashboard from './Components/Dashboard/Dashboard';
import AddService from './Components/Dashboard/AddService/AddService';
import ManageService from './Components/Dashboard/ManegeService/ManageService';
import { createContext, useState } from 'react/cjs/react.development';
import Login from './Components/Login/Login';
export const userContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home></Home>
          </Route>
          <Route exact path='/dashboard'>
            <Dashboard></Dashboard>
          </Route>
          <Route exact path="/addService">
            <AddService></AddService>
          </Route>
          <Route exact path="/manageService">
            <ManageService></ManageService>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
