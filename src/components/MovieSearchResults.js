import React from "react";
import API from "../api";

import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Animated } from "react-animated-css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";

import unavailableImage from "../images/unavailable_image.jpeg";

import "../App.css";
import "../stylesheets/MovieSearchResults.css";

export default class MovieSearchResults extends React.Component {
  render() {
    const { searchResults, searchTerm } = this.props.history.location.state;

    return (
      <Animated
        animationIn="fadeInRight"
        animationInDuration={500}
        animationOutDuration={500}
        className={"animated-section"}
        isVisible={true}
      >
        <Container id="search-results-container" fluid>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <h2>Search</h2>
              <p>
                Showing {searchResults && searchResults.results.length} results for "{searchTerm}"
              </p>
            </Col>
            {searchResults &&
              searchResults.results.map((value, index) => (
                <Col xs={6} sm={4} md={3} lg={2} className="mt-4 mb-4">
                  <Link
                    key={value.id}
                    to={`/movie/${value.id}`}
                    className="movie-apperance-link"
                  >
                    <div className="movie-apperance">
                      <div className="title-img-container">
                        <div className="title-rating">
                          <i className="fas fa-star"></i>{" "}
                          <span>{value.vote_average}</span>
                        </div>
                        <img
                          src={
                            value.poster_path
                              ? `${this.props.baseImgPath}w342${value.poster_path}`
                              : unavailableImage
                          }
                          alt=""
                        />
                      </div>
                      <p className="title-name text-truncate">
                        {value.original_title}
                      </p>
                    </div>
                  </Link>
                </Col>
              ))}
          </Row>
        </Container>
      </Animated>
    );
  }
}
