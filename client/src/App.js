import React, { Component } from "react";
import "./App.css";
import ContentContainer from "./containers/ContentContainer";

class App extends Component {
  state = { text: "" };

  render() {
    return (
      <div className="App">
        <p>Hei</p>
        <ContentContainer />
      </div>
    );
  }
}

export default App;
