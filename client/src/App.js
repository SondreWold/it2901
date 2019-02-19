import React, { Component } from "react";
import "./App.css";
import ContentContainer from "./containers/ContentContainer";

class App extends Component {
  state = { text: "" };

  render() {
    return (
      <div className="App">
        <p>Hei</p>
      </div>
    );
  }
}

export default App;
