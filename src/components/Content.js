  import React from "react";
  import { Container, Row, Col, Carousel } from "react-bootstrap";
  import Slider from "react-slick";
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
        <Container className="my-bg-primary" id="main-container" fluid>
          <Row>
            <Col
              md={3}
              lg={3}
              xl={2}
              className="d-none d-md-inline"
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
              sm={12}
              md={{ span: 9, offset: 3 }}
              lg={{ span: 9, offset: 3 }}
              xl={{ span: 10, offset: 2 }}
              id="content-container"
            >
              <Container id="content" fluid>
                <Carousel>
                  {popular === null || popular === undefined
                    ? "There was an error getting now playing movies."
                    : popular.results.map((value, index) => {
                        if (index < 3) {
                          return (
                            <Carousel.Item>
                              <img
                                className="d-block w-100"
                                src={`${this.base_img_path}original${value.backdrop_path}`}
                                alt="Fill me in"
                              />
                              <Carousel.Caption>
                                <div className="carousel-meta">
                                  <h1>{value.title}</h1>
                                  <button className="about-movie-btn my-bg-tertiary">
                                    About Movie
                                  </button>
                                </div>
                                {/* <p>This is some text that must be here.</p> */}
                              </Carousel.Caption>
                            </Carousel.Item>
                          );
                        }
                      })}
                </Carousel>
              </Container>
              <Container fluid>
                <Row className="justify-content-md-center movie-section">
                  <Col sm="12" md={10}>
                    <h2>Now Playing</h2>
                    <Container className="titles" id="now-playing">
                      {nowPlaying === null || nowPlaying === undefined ? (
                        "There was an error getting now playing movies."
                      ) : (
                        <Slider {...settings} className="titles-slider">
                          {nowPlaying.results.map((value, index) => (
                            <a
                              id={value.id}
                              href="javascript:void(0)"
                              tabindex="0"
                            >
                              <div class="title-img-container">
                                <div class="title-rating">
                                  <i class="fas fa-star"></i>{" "}
                                  <span>{value.vote_average}</span>
                                </div>
                                <img
                                  src={`${this.base_img_path}w342${value.poster_path}`}
                                  alt=""
                                />
                              </div>
                              <p class="title-name text-truncate">
                                {value.original_title}
                              </p>
                            </a>
                          ))}
                        </Slider>
                      )}
                    </Container>
                  </Col>
                </Row>
                <Row className="justify-content-md-center movie-section">
                  <Col sm="12" md={10}>
                    <h2>Upcoming</h2>
                    <Container className="titles" id="upcoming">
                    {upcoming === null || upcoming === undefined ? (
                        "There was an error getting now playing movies."
                      ) : (
                        <Slider {...settings} className="titles-slider">
                          {upcoming.results.map((value, index) => (
                            <a
                              id={value.id}
                              href="javascript:void(0)"
                              tabindex="0"
                            >
                              <div class="title-img-container">
                                <div class="title-rating">
                                  <i class="fas fa-star"></i>{" "}
                                  <span>{value.vote_average}</span>
                                </div>
                                <img
                                  src={`${this.base_img_path}w342${value.poster_path}`}
                                  alt=""
                                />
                              </div>
                              <p class="title-name text-truncate">
                                {value.original_title}
                              </p>
                            </a>
                          ))}
                        </Slider>
                      )}
                    </Container>
                  </Col>
                </Row>
                <Row className="justify-content-md-center movie-section">
                  <Col sm="12" md={10}>
                    <h2>Trending</h2>
                    <Container className="titles" id="trending">
                    {trending === null || trending === undefined ? (
                        "There was an error getting now playing movies."
                      ) : (
                        <Slider {...settings} className="titles-slider">
                          {trending.results.map((value, index) => (
                            <a
                              id={value.id}
                              href="javascript:void(0)"
                              tabindex="0"
                            >
                              <div class="title-img-container">
                                <div class="title-rating">
                                  <i class="fas fa-star"></i>{" "}
                                  <span>{value.vote_average}</span>
                                </div>
                                <img
                                  src={`${this.base_img_path}w342${value.poster_path}`}
                                  alt=""
                                />
                              </div>
                              <p class="title-name text-truncate">
                                {value.original_title}
                              </p>
                            </a>
                          ))}
                        </Slider>
                      )}
                    </Container>
                  </Col>
                </Row>
                <Row className="justify-content-md-center movie-section">
                  <Col sm="12" md={10}>
                    <h2>Top Rated</h2>
                    <Container className="titles" id="top-rated">
                    {topRated === null || topRated === undefined ? (
                        "There was an error getting now playing movies."
                      ) : (
                        <Slider {...settings} className="titles-slider">
                          {topRated.results.map((value, index) => (
                            <a
                              id={value.id}
                              href="javascript:void(0)"
                              tabindex="0"
                            >
                              <div class="title-img-container">
                                <div class="title-rating">
                                  <i class="fas fa-star"></i>{" "}
                                  <span>{value.vote_average}</span>
                                </div>
                                <img
                                  src={`${this.base_img_path}w342${value.poster_path}`}
                                  alt=""
                                />
                              </div>
                              <p class="title-name text-truncate">
                                {value.original_title}
                              </p>
                            </a>
                          ))}
                        </Slider>
                      )}
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
