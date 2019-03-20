import React, { Component } from "react";
import EmployeeDetails from "../components/EmployeeDetails/EmployeeDetails";
import EmployeeRegisterAbsence from "../components/EmployeeDetails/EmployeeRegisterAbsence";
import DeleteEmployee from "../components/EmployeeDetails/DeleteEmployee";
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
						<EmployeeAbsenceList/>
						<div className="employeeButtonsHolder">
		        	<DeleteEmployee /> {/* Endre til rediger-knapp */}
            	<DeleteEmployee />
						</div>
					</div>
		    )
    );
  }
}

export default EmployeeDetailContainer;