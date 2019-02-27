import React, { Component } from "react";
import TotalPresence from "./TotalPresence";

class TotalOverview extends Component {
  render() {
    return (
      <div>
        <TotalPresence
        totalChildren={this.props.totalChildren}
        totalAbsentChildren = {this.props.totalAbsentChildren}
        totalEmployees = {this.props.totalEmployees}
        totalAbsentEmployees = {this.props.totalAbsentEmployees}
        />
      </div>
    );
  }
}

export default TotalOverview;
