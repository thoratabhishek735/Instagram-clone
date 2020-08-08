import React, { createContext, useReducer, useEffect, useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbars from "./components/Navbar";
import Home from "./components/screens/Home";
import Login from "./components/screens/Login";
import Signup from "./components/screens/Signup";
import Profile from "./components/screens/Profile";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Createpost from "./components/screens/createpost";
import { reducer, initialState } from "./reducers/UserReducer";
import UserProfile from "./components/screens/UserProfile";

export const UserContext = createContext();
const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      history.push("/signup1");
    }
  }, []);
  return (
    // Defining routes
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup1">
        <Signup />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/create">
        <Createpost />
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    //passing state redux
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbars />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
