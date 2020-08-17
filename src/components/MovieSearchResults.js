import React from "react";
import API from "../api";
import qs from "qs";

import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Animated } from "react-animated-css";

import unavailableImage from "../images/unavailable_image.jpeg";

import "../App.css";
import "../stylesheets/MovieSearchResults.css";

export default class MovieSearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: null,
    };
  }

  // Return the data if the request was successful, otherwise `null`
  getResponseData(response) {
    return response.status === 200 ? response.data : null;
  }

  getSearchResults(query) {
    API.get(`/search/movie?query=${query}`)
      .then((response) => {
        this.setState({
          searchResults: this.getResponseData(response),
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    const searchTerm = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    }).query;
    this.getSearchResults(searchTerm);
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
    // const { searchResults, searchTerm } = this.props.history.location.state;
    const { searchResults } = this.state;

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
                Showing {searchResults && searchResults.results.length} results
              </p>
            </Col>
            {searchResults &&
              searchResults.results.map((value, index) => (
                <Col xs={6} sm={4} md={3} lg={2} className="mt-4 mb-4" key={index}>
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
