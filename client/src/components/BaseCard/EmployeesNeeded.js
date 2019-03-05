import React, { Component } from "react";

class EmployeesNeeded extends Component {
  render() {
    return (
      <div>
        <p>
          {this.props.neededEmployees === 0
            ? "OK"
            : this.props.neededEmployees > 0
            ? "Forslag: flytt " + this.props.neededEmployees + " herfra"
            : "Forslag: hent inn " + -1 * this.props.neededEmployees + " til"}
        </p>
      </div>
    );
  }
}

export default EmployeesNeeded;
