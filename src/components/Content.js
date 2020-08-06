import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import API from "../api";

import "../App.css";
import "../stylesheets/Content.css";

export default class Content extends React.Component {
  base_img_path = "https://image.tmdb.org/t/p/";

  constructor(props) {
    super(props);

    this.state = {
      nowPlaying: null,
      popular: null,
      topRated: null,
      upcoming: null,
    };
  }

  //Return the data if the request was successful, otherwise `null`
  getMovieListResponse(response) {
    return response.status === 200 ? response.data : null;
  }

  componentDidMount() {
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

    return (
      <Container className="my-bg-primary" id="main-container" fluid>
        <Row>
          <Col 
            md={3}
            lg={3}
            xl={2}
            id="sidebar-container"
          >
            <Container id="sidebar">
              <p className="my-cl-tertiary" id="sidebar-title">
                Browse
              </p>
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
          <Col
            md={{ span: 9, offset: 3 }}
            lg={{ span: 9, offset: 3 }}
            xl={{ span: 10, offset: 2 }}
            id="content-container"
          >
            <Container id="content" fluid>
              <Container id="carousel-container" fluid>
                {popular === null || popular === undefined ? (
                  "There was an error getting now playing movies."
                ) : (
                  <img
                    className="carousel-item-img"
                    src={`${this.base_img_path}original${popular.results[0].backdrop_path}`}
                  ></img>
                )}
              </Container>
            </Container>
            <Container fluid>
              <Row className="justify-content-md-center movie-section">
                <Col sm="12" md={10}>
                  <h2>Now Playing</h2>
                  <Container className="titles" id="now-playing">
                    {nowPlaying === null || nowPlaying === undefined
                      ? "There was an error getting now playing movies."
                      : nowPlaying.results.map((value, index) => {
                          return (
                            <div className="title" key={index}>
                              <img
                                className="movie-poster"
                                src={`${this.base_img_path}w342${value.poster_path}`}
                                alt="Movie poster"
                              ></img>
                            </div>
                          );
                        })}
                  </Container>
                </Col>
              </Row>
              <Row className="justify-content-md-center movie-section">
                <Col sm="12" md={10}>
                  <h2>Upcoming</h2>
                  <Container className="titles" id="upcoming">
                    {upcoming === null || upcoming === undefined
                      ? "There was an error getting now playing movies."
                      : upcoming.results.map((value, index) => {
                          return (
                            <div className="title" key={index}>
                              <img
                                className="movie-poster"
                                src={`${this.base_img_path}w342${value.poster_path}`}
                                alt="Movie poster"
                              ></img>
                            </div>
                          );
                        })}
                  </Container>
                </Col>
              </Row>
              <Row className="justify-content-md-center movie-section">
                <Col sm="12" md={10}>
                  <h2>Trending</h2>
                  <Container className="titles" id="trending">
                    {trending === null || trending === undefined
                      ? "There was an error getting trending movies."
                      : trending.results.map((value, index) => {
                          return (
                            <div className="title" key={index}>
                              <img
                                className="movie-poster"
                                src={`${this.base_img_path}w342${value.poster_path}`}
                                alt="Movie poster"
                              ></img>
                            </div>
                          );
                        })}
                  </Container>
                </Col>
              </Row>
              <Row className="justify-content-md-center movie-section">
                <Col sm="12" md={10}>
                  <h2>Top Rated</h2>
                  <Container className="titles" id="top-rated">
                    {topRated === null || topRated === undefined
                      ? "There was an error getting now playing movies."
                      : topRated.results.map((value, index) => {
                          return (
                            <div className="title" key={index}>
                              <img
                                className="movie-poster"
                                src={`${this.base_img_path}w342${value.poster_path}`}
                                alt="Movie poster"
                              ></img>
                            </div>
                          );
                        })}
                  </Container>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}
