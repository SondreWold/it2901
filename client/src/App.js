import React, { Component } from "react";
import "./App.css";
import NavigationContainer from "./containers/NavigationContainer";
import DisplayContainer from "./containers/DisplayContainer";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/jelly.css";
import  {MuiThemeProvider, createMuiTheme} from "@material-ui/core";
import Colors from "./constants/Colors";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: Colors.EmployeeColors.moveableEmployee,
        }
      },
});

class App extends Component {
  render() {
    return (
      <div className="App">
      <MuiThemeProvider theme={theme}>
        <NavigationContainer />
        <DisplayContainer />
        <Alert stack={{ limit: 3 }} />
      </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
