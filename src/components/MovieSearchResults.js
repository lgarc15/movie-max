import React from "react";
import API from "../api";
import qs from "qs";

import { getResponseData } from "../utils/Utils";

import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Animated } from "react-animated-css";

import "../App.css";
import "../stylesheets/MovieSearchResults.css";

import unavailableImage from "../images/unavailable_image.jpeg";

export default class MovieSearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: null,
      searchQuery: qs.parse(this.props.location.search, {
        ignoreQueryPrefix: true,
      }).query,
    };
  }

  getSearchResults(query) {
    API.get(`/search/movie?query=${query}`)
      .then((response) => {
        this.setState({
          searchResults: getResponseData(response),
          searchQuery: query,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.getSearchResults(this.state.searchQuery);
  }

  componentDidUpdate(prevProps, prevState) {
    const prevSearchTerm = qs.parse(prevProps.location.search, {
      ignoreQueryPrefix: true,
    }).query;
    const currentSearchTerm = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    }).query;

    if (prevSearchTerm !== currentSearchTerm) {
      this.getSearchResults(currentSearchTerm);
    }
  }

  render() {
    const { searchResults, searchQuery } = this.state;

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
              <h2 className="mt-4">Search</h2>
              <p>
                Showing {searchResults ? searchResults.results.length : 0}{" "}
                results for {searchQuery ? `"${searchQuery}"` : ""}
              </p>
            </Col>
            {searchResults &&
              searchResults.results.map((value, index) => (
                <Col
                  xs={6}
                  sm={4}
                  md={3}
                  lg={2}
                  className="mt-4 mb-4"
                  key={index}
                >
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
