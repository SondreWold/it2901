import React, { Component } from "react";
import "./App.css";
import NavigationContainer from "./containers/NavigationContainer";
import DisplayContainer from './containers/DisplayContainer';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <NavigationContainer/>
        <DisplayContainer/>
      </div>
    );
  }
}

export default App;
