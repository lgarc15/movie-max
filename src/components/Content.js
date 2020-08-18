import React from "react";

import { Switch, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import MovieSections from "./MovieSections";
import Movie from "./Movie";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Cast from "./Cast";
import MovieSearchResults from "./MovieSearchResults";

import "../App.css";
import "../stylesheets/Content.css";

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
              <Route
                path="/person/:id"
                render={(props) => (
                  <Cast {...props} baseImgPath={this.BASE_IMG_PATH} />
                )}
              />
              <Route
                path="/movies"
                render={(props) => (
                  <MovieSearchResults {...props} baseImgPath={this.BASE_IMG_PATH} />
                )}
              />
              <Route>
                <h1 className="my-cl-tertiary mt-5 text-center" style={{
                  fontWeight: 700
                }}>404 - Not Found</h1>
              </Route>
            </Switch>

            {/* ----- FOOTER ----- */}
            <Footer />
          </Col>
        </Row>
      </Container>
    );
  }
}
