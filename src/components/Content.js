import React from "react";
import Scrollspy from "react-scrollspy";
import { Switch, Link, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Animated } from "react-animated-css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faBolt,
  faChartLine,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

import theMovieDBLogo from "../images/tmdb-logo.png"

import MovieSections from "./MovieSections";
import Movie from "./Movie";


import "../App.css";
import "../stylesheets/Content.css";

export default class Content extends React.Component {
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
            <Container id="sidebar">
              <p className="my-cl-tertiary" id="sidebar-title">
                Browse
              </p>
              <Scrollspy
                items={["now-playing", "upcoming", "trending", "top-rated"]}
                currentClassName="is-active"
                componentTag="nav"
                offset={-100}
                style={{
                  padding: "0px",
                }}
              >
                <Link
                  className="sidebar-link"
                  to={{
                    pathname: "/",
                    hash: "#now-playing",
                    // state: { hashRef: 'now-playing' }
                  }}
                >
                  <FontAwesomeIcon
                    className="sidebar-icon"
                    icon={faPlay}
                  ></FontAwesomeIcon>
                  <span>Now Playing</span>
                </Link>
                <Link
                  className="sidebar-link"
                  to={{
                    pathname: "/",
                    hash: "#upcoming",
                  }}
                >
                  <FontAwesomeIcon
                    className="sidebar-icon"
                    icon={faBolt}
                  ></FontAwesomeIcon>
                  <span>Upcoming</span>
                </Link>
                <Link
                  className="sidebar-link"
                  to={{
                    pathname: "/",
                    hash: "#trending",
                  }}
                >
                  <FontAwesomeIcon
                    className="sidebar-icon"
                    icon={faChartLine}
                  ></FontAwesomeIcon>
                  <span>Trending</span>
                </Link>
                <Link
                  className="sidebar-link"
                  to={{
                    pathname: "/",
                    hash: "#top-rated",
                  }}
                >
                  <FontAwesomeIcon
                    className="sidebar-icon"
                    icon={faThumbsUp}
                  ></FontAwesomeIcon>
                  <span>Top Rated</span>
                </Link>
              </Scrollspy>
            </Container>
          </Col>
          <Col
            sm={12}
            md={{ span: 9, offset: 3 }}
            lg={{ span: 9, offset: 3 }}
            xl={{ span: 10, offset: 2 }}
            id="content-container"
          >
            <Animated
              animationIn="fadeInRight"
              animationOut="fadeOut"
              animationInDuration={500}
              animationOutDuration={500}
              isVisible={true}
            >
              <Switch>
                <Route exact path="/" component={MovieSections} />
                <Route path="/movie" component={Movie} />
              </Switch>

              <Container>
                <Row className="justify-content-center" id="footer-container">
                  <Col>
                    <footer
                      className="d-flex justify-content-center"
                      id="footer"
                    >
                      <a>
                        <img
                          src={theMovieDBLogo}
                          alt="Powered by The Movie DB"
                          id="movie-db-logo"
                        />
                      </a>
                    </footer>
                  </Col>
                </Row>
              </Container>
            </Animated>
          </Col>
        </Row>
      </Container>
    );
  }
}
