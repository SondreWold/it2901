import React, {Component} from "react";
import {FaUser, FaRegUser} from 'react-icons/fa';

class EmployeesAtBase extends Component {
  render(){
    let missingResources = 0;
    if((this.props.baseEmployees[0] - this.props.employeesPresent) >=0){
      missingResources= this.props.baseEmployees[0] - this.props.employeesPresent;
    }
    return (
      <div className="employeesHolder">
        <div className="employeeCountHolder">
          <div className="employeesAtBase">
          <FaUser size="15px"/>
            <p className="employeesAtBaseNumber">
              {" " + this.props.employeesPresent +
              "/" +
              this.props.baseEmployees + " "}
            </p>
          </div>
          <p className="employeesText">Voksne <br/> tilstede</p>
        </div>
        <div className="employeeCountHolder">
          <div className="employeesAtBase">
            <FaRegUser size="15px"/>
            <p className="employeesAtBaseNumber">
              {" " + missingResources + " "}
            </p>
          </div>
          <p className="employeesText">Fraværende <br/> voksne</p>
        </div>
      </div>
    )
  }
}

export default EmployeesAtBase;
