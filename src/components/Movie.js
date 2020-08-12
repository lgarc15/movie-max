import React from "react";
import API from "../api";
import Slider from "react-slick";

import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Animated } from "react-animated-css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import unavailableImage from "../images/unavailable_image.jpeg";

import "../App.css";
import "../stylesheets/Movie.css";
import "../stylesheets/Content.css";

export default class TopNavbar extends React.Component {
  constructor(props) {
    super(props);

    // TODO: Check if props.location.state is set. If not, attempt to search for the movie and render it.
    this.state = {
      movieDetails: null,
      movieVideos: null,
      movieCredits: null,
      similarMovies: null,
    };
  }

  //Return the data if the request was successful, otherwise `null`
  getMovieResponse(response) {
    return response.status === 200 ? response.data : null;
  }

  getMovieInfo(movieId) {
    Promise.all([
      API.get(`movie/${movieId}`),
      API.get(`movie/${movieId}/videos`),
      API.get(`movie/${movieId}/similar`),
      API.get(`movie/${movieId}/credits`),
    ])
      .then(([movieDetails, movieVideos, similarMovies, movieCredits]) => {
        this.setState({
          movieDetails: this.getMovieResponse(movieDetails),
          movieVideos: this.getMovieResponse(movieVideos),
          similarMovies: this.getMovieResponse(similarMovies),
          movieCredits: this.getMovieResponse(movieCredits),
        });
      })
      .catch(function (error) {
        // if there's an error, log it
        console.log(error);
      });
  }

  showSimilarMovie = movieId => e => {
    // param is the argument you passed to the function
    // e is the event object that returned
    this.getMovieInfo(movieId);
  };

  componentDidMount() {
    const movieId = this.props.match.params.id;
    this.getMovieInfo(movieId);
  }

  render() {
    const {
      movieDetails,
      movieVideos,
      similarMovies,
      movieCredits
    } = this.state;
    const settings = {
      infinite: false,
      arrows: true,
      draggable: true,
      slidesToShow: 6,
      slidesToScroll: 6,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    };

    return (
      <Animated
        animationIn="fadeInRight"
        animationInDuration={500}
        animationOutDuration={500}
        isVisible={true}
        className="animated-section"
      >
        <Container className="" id="movie-poster-container" fluid>
          <Row>
            <Col>
              <div id="movie-poster">
                <img
                  src={
                    movieDetails &&
                    `${this.props.baseImgPath}original${movieDetails.backdrop_path}`
                  }
                  alt="Movie Poster"
                  className="d-block w-100"
                  id="movie-img"
                />
                <div id="movie-meta">
                  <div className="movie-meta-desc" id="movie-meta-rating">
                    <FontAwesomeIcon
                      id="movie-meta-rating-icon"
                      icon={faStar}
                    ></FontAwesomeIcon>
                    <span>
                      {" "}
                      {movieDetails && movieDetails.vote_average} / 10
                    </span>
                  </div>
                  <div className="movie-meta-desc" id="movie-meta-title">
                    {movieDetails && movieDetails.original_title}
                  </div>
                  <div className="movie-meta-desc" id="movie-meta-info">
                    <span>{movieDetails && movieDetails.release_date}</span>
                    <span> &bull; </span>
                    <span>
                      {movieDetails &&
                        movieDetails.genres.map((value, index) => {
                          const genreLen = movieDetails.genres.length;
                          if (index + 1 === genreLen) {
                            return <span>{value.name}</span>;
                          } else {
                            return <span>{value.name} | </span>;
                          }
                        })}
                    </span>
                    <span> &bull; </span>
                    <span>{movieDetails && movieDetails.runtime} mins</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container id="movie-info-container" fluid>
          <Row id="movie-info">
            {/* <Col>Status: {movieDetails && movieDetails.status}</Col> */}

            <Col
              xs={{ span: 10, offset: 1 }}
              sm={{ span: 10, offset: 1 }}
              md={{ span: 10, offset: 1 }}
              lg={{ span: 10, offset: 1 }}
              xl={{ span: 10, offset: 1 }}
            >
              <Row>
                <Col lg={10}>
                  <p>
                    Status: <span>{movieDetails && movieDetails.status}</span>
                  </p>

                  {/* ----- START: MOVIE TRAILER ----- */}
                  <Row>
                    <Col lg={10} id="movie-trailer">
                      <h2>{movieDetails && movieDetails.original_title}</h2>
                      {movieVideos ? (
                        <div class="iframe-container">
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${movieVideos.results[0].key}`}
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <p class="lead">
                          We we\'re unable to find a video preview for this
                          movie :/
                        </p>
                      )}
                    </Col>
                  </Row>
                  {/* ----- END: MOVIE TRAILER ----- */}

                  <div>
                    <h2>Summary</h2>
                    <p>{movieDetails && movieDetails.overview}</p>

                    <h2>Production Countries</h2>
                    <ul>
                      {movieDetails &&
                        movieDetails.production_companies
                          .map((prod_comp) => prod_comp.origin_country)
                          .filter(
                            (value, index, self) =>
                              self.indexOf(value) === index
                          )
                          .map((prod_comp) => <li>{prod_comp}</li>)}
                    </ul>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* START: CAST */}
          <Row id="cast-container">
            <Col
              xs={{ span: 10, offset: 1 }}
              sm={{ span: 10, offset: 1 }}
              md={{ span: 10, offset: 1 }}
              lg={{ span: 10, offset: 1 }}
              xl={{ span: 10, offset: 1 }}
            >
              <h2>Cast</h2>
              {movieCredits && (
                <Slider {...settings} className="titles-slider">
                  {movieCredits.cast.map((value, index) => (
                    <Link key={value.id} to={`/movie/${value.id}`}>
                      <div className="title-img-container">
                        <img
                          src={
                            value.profile_path
                              ? `${this.props.baseImgPath}w342${value.profile_path}`
                              : unavailableImage
                          }
                          alt=""
                        />
                      </div>
                      <p className="title-name text-truncate">
                        {value.name}
                      </p>
                      <p className="title-name text-truncate">
                        {value.character}
                      </p>
                    </Link>
                  ))}
                </Slider>
              )}
            </Col>
          </Row>
          {/* END: CAST */}

          {/* START: RELATED MOVIES */}
          <Row>
            <Col
              xs={{ span: 10, offset: 1 }}
              sm={{ span: 10, offset: 1 }}
              md={{ span: 10, offset: 1 }}
              lg={{ span: 10, offset: 1 }}
              xl={{ span: 10, offset: 1 }}
            >
              <h2>Related Movies</h2>
              {similarMovies !== null && (
                  <Slider {...settings} className="titles-slider">
                    {similarMovies.results.map((value, index) => (
                      <Link
                        key={value.id}
                        to={`/movie/${value.id}`}
                        // TODO: This should be uncommented and animation should be retriggered after clicking on similar movie.
                        // onClick={this.showSimilarMovie(value.id)}
                      >
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
                      </Link>
                    ))}
                  </Slider>
                )}
            </Col>
          </Row>
          {/* END: RELATED MOVIES */}

          {/* START: REVIEWS */}
          <Row>
            <Col
              xs={{ span: 10, offset: 1 }}
              sm={{ span: 10, offset: 1 }}
              md={{ span: 10, offset: 1 }}
              lg={{ span: 10, offset: 1 }}
              xl={{ span: 10, offset: 1 }}
              id="review-container"
            >
              asdf
            </Col>
          </Row>
          {/* END: REVIEWS */}
        </Container>
      </Animated>
    );
  }
}
