import React from "react";

import API from "../api";
import Slider from "react-slick";

import { Container, Row, Col, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../App.css";
import "../stylesheets/Movie.css";
import "../stylesheets/MovieSections.css";

import unavailableImage from "../images/unavailable_image.jpeg";

export default class MovieSections extends React.Component {
  base_img_path = "https://image.tmdb.org/t/p/";

  constructor(props) {
    super(props);

    this.nowPlayingRef = React.createRef();
    this.upcomingRef = React.createRef();
    this.trendingRef = React.createRef();
    this.topRatedRef = React.createRef();

    this.state = {
      popular: null,
      nowPlaying: null,
      upcoming: null,
      trending: null,
      topRated: null,
    };
  }

  //Return the data if the request was successful, otherwise `null`
  getMovieListResponse(response) {
    return response.status === 200 ? response.data : null;
  }

  jumpToHash = () => {
    const hash = this.props.location.hash;
    if (hash) {
      let ref = null;
      switch (hash) {
        case "#now-playing":
          ref = this.nowPlayingRef;
          break;
        case "#upcoming":
          ref = this.upcomingRef;
          break;
        case "#trending":
          ref = this.trendingRef;
          break;
        case "#top-rated":
          ref = this.topRatedRef;
          break;
        default:
          console.error(`INVALID REF = "${hash}"`);
      }
      if (ref && ref.current) {
        window.scrollTo({
          top: ref.current.offsetTop,
          left: 0,
          behavior: "smooth",
        });
      } else {
        window.scrollTo(0, 0);
      }
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps || this.state !== prevState) {
      this.jumpToHash();
    }
  }

  componentDidMount() {
    this.jumpToHash();
    Promise.all([
      API.get("movie/popular"),
      API.get("movie/now_playing"),
      API.get("movie/upcoming"),
      API.get("trending/movie/day"),
      API.get("movie/top_rated"),
    ])
      .then(([popular, nowPlaying, upcoming, trending, topRated]) => {
        this.setState({
          popular: this.getMovieListResponse(popular),
          nowPlaying: this.getMovieListResponse(nowPlaying),
          upcoming: this.getMovieListResponse(upcoming),
          trending: this.getMovieListResponse(trending),
          topRated: this.getMovieListResponse(topRated),
        });
      })
      .catch(function (error) {
        // if there's an error, log it
        console.log(error);
      });
  }

  render() {
    const { popular, nowPlaying, upcoming, trending, topRated } = this.state;
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
      <div id="movie-sections">
        <Container fluid>
          <Row>
            <Col className="carousel-container">
              <Carousel id="carousel">
                {popular !== null &&
                  popular.results.slice(0, 3).map((value, index) => {
                    return (
                      <Carousel.Item key={value.id} className="carousel-item">
                        <img
                          className="d-block w-100 carousel-img"
                          src={`${this.base_img_path}original${value.backdrop_path}`}
                          alt="Fill me in"
                        />
                        <Carousel.Caption>
                          <div className="carousel-meta">
                            <h1 className="carousel-meta-name">
                              {value.title}
                            </h1>
                            <button className="about-movie-btn my-bg-tertiary">
                              About Movie
                            </button>
                          </div>
                          {/* <p>This is some text that must be here.</p> */}
                        </Carousel.Caption>
                      </Carousel.Item>
                    );
                  })}
              </Carousel>
            </Col>
          </Row>
          <Row
            className="justify-content-md-center movie-section"
            ref={this.nowPlayingRef}
            id="now-playing"
          >
            <Col sm="12" md={10}>
              <Container className="titles">
                <h2>Now Playing</h2>
                {nowPlaying !== null && (
                  <Slider {...settings} className="titles-slider">
                    {nowPlaying.results.map((value, index) => (
                      <Link key={value.id} to={`/movie?movie_id=${value.id}`}>
                        <div className="title-img-container">
                          <div className="title-rating">
                            <i className="fas fa-star"></i>{" "}
                            <span>{value.vote_average}</span>
                          </div>
                          <img
                            src={
                              value.poster_path
                                ? `${this.base_img_path}w342${value.poster_path}`
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
              </Container>
            </Col>
          </Row>
          <Row
            className="justify-content-md-center movie-section"
            ref={this.upcomingRef}
            id="upcoming"
          >
            <Col sm="12" md={10}>
              <Container className="titles">
                <h2>Upcoming</h2>
                {upcoming !== null && (
                  <Slider {...settings} className="titles-slider">
                    {upcoming.results.map((value, index) => (
                      <Link key={value.id} to={`/movie?movie_id=${value.id}`}>
                        <div className="title-img-container">
                          <div className="title-rating">
                            <i className="fas fa-star"></i>{" "}
                            <span>{value.vote_average}</span>
                          </div>
                          <img
                            src={
                              value.poster_path
                                ? `${this.base_img_path}w342${value.poster_path}`
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
              </Container>
            </Col>
          </Row>
          <Row
            className="justify-content-md-center movie-section"
            ref={this.trendingRef}
            id="trending"
          >
            <Col sm="12" md={10}>
              <Container className="titles">
                <h2>Trending</h2>
                {trending !== null && (
                  <Slider {...settings} className="titles-slider">
                    {trending.results.map((value, index) => (
                      <Link key={value.id} to={`/movie?movie_id=${value.id}`}>
                        <div className="title-img-container">
                          <div className="title-rating">
                            <i className="fas fa-star"></i>{" "}
                            <span>{value.vote_average}</span>
                          </div>
                          <img
                            src={
                              value.poster_path
                                ? `${this.base_img_path}w342${value.poster_path}`
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
              </Container>
            </Col>
          </Row>
          <Row
            className="justify-content-md-center movie-section"
            ref={this.topRatedRef}
            id="top-rated"
          >
            <Col sm="12" md={10}>
              <Container className="titles">
                <h2>Top Rated</h2>
                {topRated !== null && (
                  <Slider {...settings} className="titles-slider">
                    {topRated.results.map((value, index) => (
                      <Link key={value.id} to={`/movie?movie_id=${value.id}`}>
                        <div className="title-img-container">
                          <div className="title-rating">
                            <i className="fas fa-star"></i>{" "}
                            <span>{value.vote_average}</span>
                          </div>
                          <img
                            src={
                              value.poster_path
                                ? `${this.base_img_path}w342${value.poster_path}`
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
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
