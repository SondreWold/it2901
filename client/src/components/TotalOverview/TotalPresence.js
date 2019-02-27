import React, { Component } from "react";
import ChildrenPresent from "./ChildrenPresent";
import EmployeesPresent from "./EmployeesPresent";

class TotalPresence extends Component{
  render(){
    return(
      <div>
      <ChildrenPresent
      totalChildren={this.props.totalChildren}
      totalAbsentChildren = {this.props.totalAbsentChildren}
      />
      <EmployeesPresent
      totalEmployees = {this.props.totalEmployees}
      totalAbsentEmployees = {this.props.totalAbsentEmployees}
      />
      </div>
    );
  }
}

export default TotalPresence;
