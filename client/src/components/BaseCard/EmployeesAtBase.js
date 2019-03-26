import React, { Component } from "react";
import { FaUser, FaRegUser } from "react-icons/fa";
import moment from "moment";

class EmployeesAtBase extends Component {
  calcMissingResources = (absentEmployees, base, employees, date) => {
    const missingResources = absentEmployees
      .map(ae =>
        Object.assign(ae, employees.find(e => e.id === ae.employee_id))
      )
      .filter(e => e.base_id === base.id)
      .filter(
        e =>
          moment(e.date).format("YYYY-MM-DD") ===
          moment(date).format("YYYY-MM-DD")
      );

    return missingResources.length;
  };

  render() {
    const missingResources = this.calcMissingResources(
      this.props.absentEmployees,
      this.props.base,
      this.props.employees,
      this.props.date
    );
    /*
    let missingResources = 0;
    if((this.props.baseEmployees[0] - this.props.employeesPresent) >=0){
      missingResources= this.props.baseEmployees[0] - this.props.employeesPresent;
    }

    */
    return (
      <div className="employeesHolder">
        <div className="employeeCountHolder">
          <div className="employeesAtBase">
            <FaUser size="15px" />
            <p className="employeesAtBaseNumber">
              {" " +
                this.props.employeesPresent +
                "/" +
                this.props.baseEmployees +
                " "}
            </p>
          </div>
          <p className="employeesText">
            Voksne <br /> tilstede
          </p>
        </div>
        <div className="employeeCountHolder">
          <div className="employeesAtBase">
            <FaRegUser size="15px" />
            <p className="employeesAtBaseNumber">
              {" " + missingResources + " "}
            </p>
          </div>
          <p className="employeesText">
            Fraværende <br /> voksne
          </p>
        </div>
      </div>
    );
  }
}

export default EmployeesAtBase;
