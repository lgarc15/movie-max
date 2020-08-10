import React from "react";
import { Switch, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Animated } from "react-animated-css";

import MovieSections from "./MovieSections";
import Movie from "./Movie";
import Footer from "./Footer";


import "../App.css";
import "../stylesheets/Content.css";
import Sidebar from "./Sidebar";

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
            <Sidebar />
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

              <Footer />
            </Animated>
          </Col>
        </Row>
      </Container>
    );
  }
}
