import React, { Component } from "react";
import "./App.css";
import DateComponent from "./components/DateComponent";
import ContentContainer from "./containers/ContentContainer";
import NavigationContainer from "./containers/NavigationContainer";

class App extends Component {
  state = { text: "" };

  render() {
    return (

      <div className="App">
        <NavigationContainer/>
        <ContentContainer/>
      </div>
      
    );
  }
}

export default App;
