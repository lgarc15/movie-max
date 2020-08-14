import React from "react";
import { withRouter } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import brandLogo from "../images/brand_logo.png";

import "../App.css";
import "../stylesheets/TopNavbar.css";

class TopNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
    };
  }

  handleInputChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { searchTerm } = this.state;
    this.setState({ searchTerm: "" });

    if (searchTerm.length > 0) {
      this.props.history.push({
        pathname: "/movies",
        search: `?query=${searchTerm}`
      });
    }
  };

  render() {
    return (
      <Navbar expand="lg" fixed="top" id="top-navbar">
        <Navbar.Brand className="my-cl-tertiary" id="top-navbar-brand">
          <Link
            to={{
              pathname: "/",
            }}
          >
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
          <Nav id="top-navbar-search-form-container">
            <Form id="top-navbar-search-form" inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-2"
                id="top-navbar-search-input"
                value={this.state.searchTerm}
                onChange={this.handleInputChange}
              />
              <Button
                className="my-bg-tertiary"
                id="top-navbar-search-btn"
                onClick={this.handleSubmit}
              >
                Search
              </Button>
            </Form>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(TopNavbar);
