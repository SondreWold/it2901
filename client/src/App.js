import React, { Component } from "react";
import "./App.css";
import NavigationContainer from "./containers/NavigationContainer";
import DisplayContainer from './containers/DisplayContainer';
import StickyContainer from 'react-sticky-header';
import 'react-sticky-header/styles.css';

class App extends Component {
  state = { text: "" };

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
