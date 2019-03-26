import React, { Component } from "react";
import EmployeeDetails from "../components/EmployeeDetails/EmployeeDetails";
import EmployeeRegisterAbsence from "../components/EmployeeDetails/EmployeeRegisterAbsence";
import DeleteEmployee from "../components/EmployeeDetails/DeleteEmployee";
import AddEmployee from "../components/EmployeeList/AddEmployee";
import EmployeeAbsenceList from "../components/EmployeeDetails/EmployeeAbsenceList";
import "../components/EmployeeDetails/EmployeeDetails.css";

class EmployeeDetailContainer extends Component {
  render() {
    return (
      this.props.selectedEmployee && (
        <div className="detailsContainer">
          <EmployeeDetails
            selectedEmployee={this.props.selectedEmployee}
            getSelectedBase={this.props.getSelectedBase}
            selectedBase={this.props.selectedBase}
          />
          <EmployeeRegisterAbsence
            selectedEmployee={this.props.selectedEmployee}
            insertAbsentEmployee={this.props.insertAbsentEmployee}
          />
          <EmployeeAbsenceList
            selectedEmployee={this.props.selectedEmployee}
            getAbsence={this.props.getAbsence}
            absence={this.props.absence}
          />
          <div className="employeeButtonsHolder">
            <AddEmployee
              showEdit={true}
              first_name={this.props.selectedEmployee.first_name}
              last_name={this.props.selectedEmployee.last_name}
              base_id={this.props.selectedEmployee.base_id.toString()}
              position={this.props.selectedEmployee.position.toString()}
              empId={this.props.selectedEmployee.id}
              employee={this.props.selectedEmployee}
            />
            <DeleteEmployee />
          </div>
        </div>
      )
    );
  }
}

export default EmployeeDetailContainer;
