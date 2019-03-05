import React, {Component} from "react";
import {FaUser, FaRegUser} from 'react-icons/fa';

class EmployeesAtBase extends Component {
  render(){
    return (
      <div className="employeesHolder">
        <div className="employeeCountHolder">
          <div className="employeesAtBase">
          <FaUser size="15px"/>
            <p className="employeesAtBaseNumber">
              {" " + this.props.baseEmployees[0] -
              this.props.baseEmployees[1] +
              "/" +
              this.props.baseEmployees[0] + " "}
            </p>
          </div>
          <p className="employeesText">Voksne <br/> tilstede</p>
        </div>
        <div className="employeeCountHolder">
          <div className="employeesAtBase">
            <FaRegUser size="15px"/>
            <p className="employeesAtBaseNumber">
              {" " + this.props.baseEmployees[1] + " "}
            </p>
          </div>
          <p className="employeesText">Manglende <br/> ressurser</p>
        </div>
      </div>
    )
  }
}

export default EmployeesAtBase;
