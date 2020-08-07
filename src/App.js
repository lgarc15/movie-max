import React from "react";

import TopNavbar from "./components/TopNavbar";
import Content from "./components/Content"

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <div className="App">
      <TopNavbar />
      <Content />
    </div>
  );
}

export default App;
