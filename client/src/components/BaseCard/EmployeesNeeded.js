import React, { Component } from "react";
import "./BaseCard.css";

class EmployeesNeeded extends Component {
  render() {
    return (
      <div>
        <i className="employeesNeeded">
          {this.props.neededEmployees === 0
            ? "OK"
            : this.props.neededEmployees >= 0
            ? "Overbemanning: " + this.props.neededEmployees
            : "Underbemanning: " + -1 * this.props.neededEmployees}
        </i>
      </div>
    );
  }
}

export default EmployeesNeeded;
