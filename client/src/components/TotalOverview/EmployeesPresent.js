import React, { Component } from "react";
import MaterialIcon from "material-icons-react";

class EmployeesPresent extends Component{
  render(){
    return(
      <div className="totalEmployees">
      <MaterialIcon icon="people" color="black" />
      {this.props.totalEmployees -
        this.props.totalAbsentEmployees +
        "/" +
        this.props.totalEmployees + " Voksne tilstede"}
      </div>
    );
  }
}

export default EmployeesPresent;
