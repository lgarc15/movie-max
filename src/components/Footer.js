import React from "react";

import { Container, Row, Col } from "react-bootstrap";

import "../App.css";
import "../stylesheets/Footer.css";

import theMovieDBLogo from "../images/tmdb-logo.png"

export default class Footer extends React.Component {
  render() {
    return (
      <Container fluid>
        <Row className="justify-content-center" id="footer-container">
          <Col>
            <footer className="d-flex justify-content-center" id="footer">
              <a href="https://www.themoviedb.org/">
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
    );
  }
}
