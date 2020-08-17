import React from "react";
import Slider from "react-slick";

import { Link } from "react-router-dom";

import unavailableImage from "../images/unavailable_image.jpeg";

export default class MovieSlider extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
      <Slider {...settings} className="titles-slider">
        {this.props.movieList.results.map((value, index) => (
          <Link key={value.id} to={`/movie/${value.id}`} onClick={this.props.onMovieClick && this.props.onMovieClick(value.id)}>
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
            <p className="title-name text-truncate">{value.original_title}</p>
          </Link>
        ))}
      </Slider>
    );
  }
}
