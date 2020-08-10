import React from "react";

import { Animated } from "react-animated-css";

import "../App.css";
import "../stylesheets/Movie.css";

export default class TopNavbar extends React.Component {
  render() {
    return (
      <Animated
        animationIn="fadeInRight"
        animationInDuration={500}
        animationOutDuration={500}
        isVisible={true}
        className="animated-section"
      >
        <div className="" id="movie">
          Movie
        </div>
      </Animated>
    );
  }
}
