import React from "react";

import TopNavbar from "./components/TopNavbar";
import Content from "./components/Content"
import { Spinner } from "react-bootstrap"

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function demoAsyncCall() {
  return new Promise((resolve) => setTimeout(() => resolve(), 1000));
}

export default class App extends React.Component {

  state = {
    loading: true
  };

  componentDidMount() {
    // this simulates an async action, after which the component will render the content
    demoAsyncCall().then(() => this.setState({ loading: false }));
  }

  render() {
    const { loading } = this.state;

    if(loading) { // if your component doesn't have to wait for async data, remove this block 
      return (
        <div className="my-bg-secondary" id="page-loader-container">
          <Spinner animation="grow" className="my-cl-tertiary" id="page-loader" />
        </div>
      ); // render null when app is not ready
    }

    return (
      <div className="App">
        <TopNavbar />
        <Content />
      </div>
    );
  }
}

