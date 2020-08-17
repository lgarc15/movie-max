import React from "react";
import API from "../api";

import { getResponseData } from "../utils/Utils";

import { Container, Row, Col, Carousel } from "react-bootstrap";
import { Animated } from "react-animated-css";

import MovieSlider from "../components/MovieSlider";

import "../App.css";
import "../stylesheets/MovieSections.css";

export default class MovieSections extends React.Component {
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
          popular: getResponseData(popular),
          nowPlaying: getResponseData(nowPlaying),
          upcoming: getResponseData(upcoming),
          trending: getResponseData(trending),
          topRated: getResponseData(topRated),
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
      <Animated
        animationIn="fadeInRight"
        animationInDuration={500}
        animationOutDuration={500}
        className="animated-section"
        isVisible={true}
      >
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
                          src={`${this.props.baseImgPath}original${value.backdrop_path}`}
                          alt="Movie Poster`"
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
                  <MovieSlider movieList={nowPlaying} baseImgPath={this.props.baseImgPath} />
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
                  <MovieSlider movieList={upcoming} baseImgPath={this.props.baseImgPath} />
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
                  <MovieSlider movieList={trending} baseImgPath={this.props.baseImgPath} />
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
                  <MovieSlider movieList={topRated} baseImgPath={this.props.baseImgPath} />
                )}
              </Container>
            </Col>
          </Row>
        </Container>
      </Animated>
    );
  }
}
