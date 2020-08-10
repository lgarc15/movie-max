import React from "react";

import { Animated } from "react-animated-css";

import "../App.css";
import "../stylesheets/Movie.css";

export default class TopNavbar extends React.Component {
  constructor(props) {
    super(props);
    // TODO: Check if props.location.state is set. If not, attempt to search for the movie and render it.
  }

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
          <div>
            <div id="movie-poster">
              
            </div>
            <div id="movie-meta"></div>
          </div>
        </div>
      </Animated>
    );
  }
}
