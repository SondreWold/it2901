import React, { Component } from "react";
import TotalPresence from "./TotalPresence";
import DateComponent from "../Date/DateComponent";

class TotalOverview extends Component {
  render() {
    return (
      <div>
        <DateComponent
        date={this.props.date}
        changeDate={this.props.changeDate}
        />
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
