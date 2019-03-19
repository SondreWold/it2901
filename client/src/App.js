import React, { Component } from "react";
import "./App.css";
import NavigationContainer from "./containers/NavigationContainer";
import DisplayContainer from "./containers/DisplayContainer";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/jelly.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationContainer />
        <DisplayContainer />
        <Alert stack={{ limit: 3 }} />
      </div>
    );
  }
}

export default App;
