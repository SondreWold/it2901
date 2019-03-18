import React, { Component } from "react";
import EmployeeDetails from "../components/EmployeeDetails/EmployeeDetails";
import EmployeeRegisterAbsence from "../components/EmployeeDetails/EmployeeRegisterAbsence";
import DeleteEmployee from "../components/EmployeeDetails/DeleteEmployee";


class EmployeeDetailContainer extends Component {
  render() {
    return (
		    this.props.selectedEmployee && (
		    	<div>
		        <EmployeeDetails
		          selectedEmployee={this.props.selectedEmployee}
		        />
						<div className="employeeButtonsHolder">
		        	<EmployeeRegisterAbsence 
		        		selectedEmployee={this.props.selectedEmployee}
		        		insertAbsentEmployee={this.props.insertAbsentEmployee}
		        	/>
            	<DeleteEmployee />
						</div>
					</div>
		    )
    );
  }
}

export default EmployeeDetailContainer;