import React, { useContext } from "react";
import { BrowserRouter, Route, Link, useHistory } from "react-router-dom";
import {
  Button,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";
import "../App.css";
import { UserContext } from "../App";
const Navbars = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const renderlist = () => {
    if (state) {
      return [
        <li key="0" className="bgf1 mr-5">
          <Link to="/profile">Welcome {state ? state.name : "loading"}</Link>
        </li>,
        <li key="1" className="mr-5 text-dark bgf">
          <Link to="/profile">Profile</Link>
        </li>,
        <li key="2" className="mr-5 text-dark bgf">
          <Link to="/">Home</Link>
        </li>,
        <li key="3" className="mr-5 text-dark bgf">
          <Link to="/create">Post Photo</Link>
        </li>,
        <li key="4">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "END" });
              history.push("/signup1");
            }}
          >
            Logout
          </button>
        </li>,
      ];
    } else {
      return [
        <li key="5" className="mr-5 text-dark bgf">
          <Link to="/login">Signin</Link>
        </li>,
        <li key="6" className="mr-5 text-dark bgf">
          <Link to="/signup1">Signup</Link>
        </li>,
      ];
    }
  };
  return (
    <div id="navbar">
      <Navbar bg="white" className="border shadow " expand="lg">
        <Navbar.Brand id="brand">
          <Link to="/" className="text-dark ">
            <h1>Instagram</h1>
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {renderlist()}

            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown" className="mr-5 text-dark bgf ">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        
      </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navbars;
