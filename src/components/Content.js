import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import "../App.css";
import "../stylesheets/Content.css";

export default class TopNavbar extends React.Component {
  render() {
    return (
        <Container className="my-bg-primary" id="main-container" fluid>
            <Row>
                <Col md={3} lg={3} xl={2} id="sidebar-container">
                    <Container id="sidebar">
                        <p className="my-cl-tertiary" id="sidebar-title">Browse</p>
                        <ul id="sidebar-links">
                            <li>
                                <a href="#a">Now Playing</a>
                            </li>
                            <li>
                                <a href="#a">Upcoming</a>
                            </li>
                            <li>
                                <a href="#a">Trending</a>
                            </li>
                            <li>
                                <a href="#a">Top Rated</a>
                            </li>
                        </ul>
                    </Container>
                </Col>
                <Col md={9} lg={9} xl={10} id="content-container">
                    <Container id="content" fluid>
                        <Container id="carousel-container" fluid></Container>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
  }
}
