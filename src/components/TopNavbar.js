import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import brandLogo from "../images/brand_logo.png";

import "../App.css";
import "../stylesheets/TopNavbar.css";

export default class TopNavbar extends React.Component {
  render() {
    return (
      <Navbar expand="lg" id="top-navbar">
        <Navbar.Brand className="my-cl-tertiary" id="top-navbar-brand">
          <Link to={{
              pathname: "/",
              hash: "#main-container"
            }}>
            <img
              alt=""
              src={brandLogo}
              width="60"
              height="60"
              className="d-inline-block align-top"
            />{" "}
            MovieMax
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="top-navbar-content" />
        <Navbar.Collapse id="top-navbar-content">
          <Nav className="mr-auto" />
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-2" />
            <Button className="my-bg-tertiary" id="top-navbar-search-btn">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
