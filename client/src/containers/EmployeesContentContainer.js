import React, { Component } from "react";
import EmployeeListContainer from "./EmployeeList/EmployeeListContainer";

class EmployeesContentContainer extends Component {
  render() {
    return (
      <div>
        <EmployeeListContainer />
      </div>
    );
  }
}

export default EmployeesContentContainer;
