import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import DateComponent from "./components/DateComponent";

class App extends Component {
  state = { text: "" };

  render() {
    return (
      <div className="App">
        Her skal det komme saker og ting
        <DateComponent />
      </div>
    );
  }
}

export default App;
