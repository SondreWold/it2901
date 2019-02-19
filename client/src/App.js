import React, { Component } from "react";
import "./App.css";
import ContentContainer from "./containers/ContentContainer";

class App extends Component {
  state = { text: "" };

  render() {
    return (
      <div className="App">
        <ContentContainer />
      </div>
    );
  }
}

export default App;
