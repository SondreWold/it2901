import React, { Component } from "react";
import { Route } from "react-router-dom";
import HomeContentContainer from "./HomeContentContainer";
import EmployeesContentContainer from "./EmployeesContentContainer";
import SettingsContentContainer from "./SettingsContentContainer";
import StatsContentContainer from "./StatsContentContainer";
import NotFoundPage from "../components/NotFoundPage";

class DisplayContainer extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={HomeContentContainer} />
        <Route exact path="/employees" component={EmployeesContentContainer} />
        <Route exact path="/stats" component={StatsContentContainer} />
        <Route exact path="/settings" component={SettingsContentContainer} />
        {/*<Route path="*" component={NotFoundPage} />*/}
      </div>
    );
  }
}

export default DisplayContainer;
