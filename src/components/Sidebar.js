import React from "react";
import Scrollspy from "react-scrollspy";

import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faBolt,
  faChartLine,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

import "../App.css";
import "../stylesheets/Sidebar.css";

export default class Sidebar extends React.Component {
  render() {
    return (
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
              hash: "#now-playing"
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
    );
  }
}
