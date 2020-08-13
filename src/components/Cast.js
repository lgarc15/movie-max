import React from "react";
import API from "../api";

import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Animated } from "react-animated-css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";

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

    return (
      <Animated
        animationIn="fadeInRight"
        animationInDuration={500}
        animationOutDuration={500}
        className={"animated-section"}
        isVisible={true}
      >
        <Container id="cast-member-container" fluid>
          {person && (
            <Row className="mt-4">
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
                <h1 className="mt-3">{person && person.name}</h1>
                <p id="cast-birthplace-container">
                  <FontAwesomeIcon
                    id="cast-birthplace-logo"
                    icon={faGlobeAmericas}
                  ></FontAwesomeIcon>
                  <span id="cast-birthplace">{person && person.place_of_birth}</span>
                </p>
              </Col>
            </Row>
          )}
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <h2 className="mt-5">Movie Appearances</h2>
              <p className="movie-apperance-results">
                Showing {personCredits && personCredits.cast.length} results
              </p>
            </Col>
            {personCredits &&
              personCredits.cast.map((value, index) => (
                <Col xs={6} sm={4} md={3} lg={2} className="mt-4 mb-4">
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
