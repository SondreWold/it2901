import React, { Component } from "react";
import TotalPresence from "./TotalPresence";
import DateComponent from "../Date/DateComponent";
import "./TotalOverview.css";

class TotalOverview extends Component {
  getTotalOverview = () => {
    var result = [];
    let totalChildren = 0;
    let totalAbsentChildren = 0;
    let totalEmployees = this.props.employees.length;
    if (this.props.children.length > 0) {
      this.props.children.map(child => {
        totalChildren += child.total_children;
        totalAbsentChildren += child.children;
      });
    }
    let workingEmployeesNumber = 0;
    for (var key in this.props.working_employees) {
      for (let i = 0; i < this.props.working_employees[key].length; i++) {
        workingEmployeesNumber++;
      }
    }
    let totalAbsentEmployees = totalEmployees - workingEmployeesNumber;
    result.push(
      totalChildren,
      totalAbsentChildren,
      totalAbsentEmployees,
      totalEmployees
    );
    return result;
  };

  render() {
    let overviewList = this.getTotalOverview();
    return (
      <div className="totalOverviewHolder">
        <DateComponent
          date={this.props.date}
          changeDate={this.props.changeDate}
          minDate={this.props.minDate}
        />
        <TotalPresence
          totalChildren={overviewList[0]}
          totalAbsentChildren={overviewList[1]}
          totalAbsentEmployees={overviewList[2]}
          totalEmployees={overviewList[3]}
        />
      </div>
    );
  }
}

export default TotalOverview;
