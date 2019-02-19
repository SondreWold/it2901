import React, { Component } from "react";
import "./App.css";
import ContentContainer from "./containers/ContentContainer";
import BaseCardList from "./components/BaseCardList";

class App extends Component {
  state = { text: "" };

  render() {
    return (

      <div className="App">
        <p>Hei</p>
        <BaseCardList/>
      </div>
      
    );
  }
}

export default App;
