import React, { Component } from "react";
import EmployeeDetails from "../components/EmployeeDetails/EmployeeDetails";
import EmployeeRegisterAbsence from "../components/EmployeeDetails/EmployeeRegisterAbsence";


class EmployeeDetailContainer extends Component {
  render() {
    return (
		    this.props.selectedEmployee && (
		    	<div>
		        <EmployeeDetails
		          selectedEmployee={this.props.selectedEmployee}
		        />
		        <EmployeeRegisterAbsence 
		        	selectedEmployee={this.props.selectedEmployee}
		        	insertAbsentEmployee={this.props.insertAbsentEmployee}
		        />
		      </div>
		    )
    );
  }
}

const style = {
  container: {
    margin: "30px",
    display: "flex",
    flexDirection: "row",
    width: "90%"
  },
  item: {
    flex: "1"
  }
};

export default EmployeeDetailContainer;