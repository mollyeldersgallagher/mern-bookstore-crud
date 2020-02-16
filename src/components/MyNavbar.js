/**
 * @Date:   2020-01-28T01:14:02+00:00
 * @Last modified time: 2020-02-03T11:23:20+00:00
 */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default class MyNavbar extends Component {
  logout = () => {
    localStorage.removeItem("jwtToken");
    this.props.onLogout();
  };

  render() {
    const loggedIn = this.props.loggedIn;
    return (
      <Navbar
        sticky="top"
        // collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
      >
        <Navbar.Brand to="/">Books</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/authors">
              Authors
            </Nav.Link>
            <Nav.Link as={Link} to="/genres">
              Genres
            </Nav.Link>
          </Nav>
          <Nav>
            {loggedIn ? (
              <Nav.Link onClick={this.logout}>Logout</Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
