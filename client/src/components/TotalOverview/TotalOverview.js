import React, { Component } from "react";
import TotalPresence from "./TotalPresence";
import DateComponent from "../Date/DateComponent";

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
        <DateComponent
        date={this.props.date}
        changeDate={this.props.changeDate}
        />
      </div>
    );
  }
}

export default TotalOverview;
