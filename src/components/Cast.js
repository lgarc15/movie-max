import React from "react";
import API from "../api";

import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Animated } from "react-animated-css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import unavailableImage from "../images/unavailable_image.jpeg";

import "../App.css";
import "../stylesheets/Cast.css";

export default class Cast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      person: null,
      personCredits: null,
    };
  }

  // Return the data if the request was successful, otherwise `null`
  getResponse(response) {
    return response.status === 200 ? response.data : null;
  }

  getCastInfo(personId) {
    Promise.all([
      API.get(`person/${personId}`),
      API.get(`/person/${personId}/movie_credits`),
    ])
      .then(([person, personCredits]) => {
        this.setState({
          person: this.getResponse(person),
          personCredits: this.getResponse(personCredits),
        });
      })
      .catch(function (error) {
        // if there's an error, log it
        console.log(error);
      });
  }

  componentDidMount() {
    const personId = this.props.match.params.id;
    this.getCastInfo(personId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps || this.state !== prevState) {
    }
  }

  render() {
    const { person, personCredits } = this.state;
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
        className={"animated-section"}
        style={{
          visibility: person ? "visible" : "hidden",
        }}
      >
        <Container id="cast-member-container" fluid>
          {person && (
            <Row>
              <Col
                md={{ span: 8, offset: 2 }}
                className="text-center"
                id="cast-info"
              >
                <span>
                  <img
                    src={`${this.props.baseImgPath}w342${person.profile_path}`}
                    alt="Cast Member"
                    id="cast-info-img"
                  />
                </span>
                <h1>{person && person.name}</h1>
                <p>{person && person.place_of_birth}</p>
              </Col>
            </Row>
          )}
          <h1>Movie Appearances</h1>
          <p>Showing {personCredits && personCredits.cast.length} results</p>
          <Row>
            {personCredits &&
              personCredits.cast.map((value, index) => (
                <Col xs={6} sm={4} md={3} lg={2} className="mb-5">
                  <Link key={value.id} to={`/movie/${value.id}`}>
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
                </Col>
              ))}
          </Row>
        </Container>
      </Animated>
    );
  }
}
