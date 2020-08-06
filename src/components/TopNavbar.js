import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

import "../App.css"
import "../stylesheets/TopNavbar.css"


export default class TopNavbar extends React.Component {
  render() {
    return (
      <Navbar expand="lg" id="top-navbar">
        <Navbar.Brand className="my-cl-tertiary" id="top-navbar-brand">MovieMax</Navbar.Brand>
        <Navbar.Toggle aria-controls="top-navbar-content" />
        <Navbar.Collapse id="top-navbar-content">
          <Nav className="mr-auto" />
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-2" />
            <Button className="my-bg-tertiary" id="top-navbar-search-btn">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
