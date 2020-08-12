import React from "react";
import { Switch, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import MovieSections from "./MovieSections";
import Movie from "./Movie";
import Footer from "./Footer";

import "../App.css";
import "../stylesheets/Content.css";
import Sidebar from "./Sidebar";

export default class Content extends React.Component {
  BASE_IMG_PATH = "https://image.tmdb.org/t/p/";

  render() {
    return (
      <Container className="my-bg-primary" id="main-container" fluid>
        <Row>
          <Col
            md={3}
            lg={3}
            xl={2}
            className="d-none d-md-inline"
            id="sidebar-container"
          >
            {/* ----- SIDEBAR ----- */}
            <Sidebar />
          </Col>
          <Col
            sm={12}
            md={{ span: 9, offset: 3 }}
            lg={{ span: 9, offset: 3 }}
            xl={{ span: 10, offset: 2 }}
            id="content-container"
          >
            {/* ----- MAIN CONTENT PAGES ----- */}
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <MovieSections {...props} baseImgPath={this.BASE_IMG_PATH} />
                )}
              />
              <Route
                path="/movie/:id"
                render={(props) => (
                  <Movie {...props} baseImgPath={this.BASE_IMG_PATH} />
                )}
              />
            </Switch>

            {/* ----- FOOTER ----- */}
            <Footer />
          </Col>
        </Row>
      </Container>
    );
  }
}
