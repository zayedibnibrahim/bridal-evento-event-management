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
import { createContext, useState } from 'react';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/Login/PrivateRoute';
import Book from './Components/Dashboard/Book/Book';
import ThankYouPage from './Components/Dashboard/Book/ThankYou';
import MakeAdmin from './Components/Dashboard/MakeAdmin/MakeAdmin';
import AllOrder from './Components/Dashboard/AllOrder/AllOrder';
import BookingList from './Components/Dashboard/BookingList/BookingList';
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
          <PrivateRoute exact path='/dashboard'>
            <Dashboard></Dashboard>
          </PrivateRoute>
          <PrivateRoute exact path="/addService">
            <AddService></AddService>
          </PrivateRoute>
          <PrivateRoute exact path="/allOrder">
            <AllOrder></AllOrder>
          </PrivateRoute>
          <PrivateRoute exact path="/bookingList">
            <BookingList></BookingList>
          </PrivateRoute>
          <PrivateRoute exact path="/manageService">
            <ManageService></ManageService>
          </PrivateRoute>
          <PrivateRoute exact path="/book">
            <Book></Book>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/thankYou">
            <ThankYouPage></ThankYouPage>
          </Route>
          <PrivateRoute path="/makeAdmin">
            <MakeAdmin></MakeAdmin>
          </PrivateRoute>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
