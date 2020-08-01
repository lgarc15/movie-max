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
      API.get("movie/now_playing"),
      API.get("movie/popular"),
      API.get("movie/top_rated"),
      API.get("movie/upcoming"),
    ])
      .then(([nowPlaying, popular, topRated, upcoming]) => {
        this.setState({
          nowPlaying: this.getMovieListResponse(nowPlaying),
          popular: this.getMovieListResponse(popular),
          topRated: this.getMovieListResponse(topRated),
          upcoming: this.getMovieListResponse(upcoming),
        });
      })
      .catch(function (error) {
        // if there's an error, log it
        console.log(error);
      });
  }

  render() {
    const { nowPlaying, popular, topRated, upcoming } = this.state;
    if (nowPlaying !== null) {
      console.log(nowPlaying.results);
    }

    return (
      <Container className="my-bg-primary" id="main-container" fluid>
        <Row>
          <Col md={3} lg={3} xl={2} id="sidebar-container">
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
          <Col md={9} lg={9} xl={10} id="content-container">
            <Container id="content" fluid>
              <Container id="carousel-container" fluid></Container>
            </Container>
            <Container fluid>
              <Row className="justify-content-md-center movie-section">
                <Col sm="12" md={10}>
                  <h2>Now Playing</h2>
                  <Container className="titles" id="now-playing">
                    {nowPlaying === null
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
                    {upcoming === null
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
                    {popular === null
                      ? "There was an error getting now playing movies."
                      : popular.results.map((value, index) => {
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
                    {topRated === null
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
