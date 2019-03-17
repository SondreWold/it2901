import React, { Component } from "react";
import { connect } from "react-redux";
import { insertAbsentEmployee } from "../actions/insertAbsentEmployeeAction";
import { updateSelectedEmployee } from "../actions/EmployeeListActions/EmployeeListActions";
import { getEmployees } from "../actions/contentActions/contentEmployeeActions";
import EmployeesContainer from "./EmployeesContainer";
import EmployeeDetailContainer from "./EmployeeDetailContainer";
import AddEmployee from "../components/EmployeeTools/AddEmployee";

class EmployeesContentContainer extends Component {
  componentDidMount() {
    this.props.getEmployees();
  }
  render() {
    return (
      <div style={style.container}>
      	<div style={style.item}>
	        <EmployeesContainer
	          employees={this.props.listOfEmployees}
	          getEmployees={this.props.getEmployees}
	          selectedEmployee={this.props.selectedEmployee}
	          updateSelectedEmployee={this.props.updateSelectedEmployee}
	        />
	      </div>
	      <div style={style.item}>
	      	<EmployeeDetailContainer
	      		selectedEmployee={this.props.selectedEmployee}
	      		insertAbsentEmployee={this.props.insertAbsentEmployee}
	      		minDate={this.props.minDate}
	      	/>
	      </div>
        <AddEmployee/>
      </div>
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

const mapDispatchToProps = dispatch => {
  return {
    getEmployees: name => dispatch(getEmployees(name)),
    updateSelectedEmployee: employee => dispatch(updateSelectedEmployee(employee)),
    insertAbsentEmployee: (empId, date) => dispatch(insertAbsentEmployee(empId, date))
  };
};

const mapStateToProps = state => ({
  listOfEmployees: state.contentEmployee.employees,
  selectedEmployee: state.employeeList.selectedEmployee,
  minDate: state.date.minDate
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeesContentContainer);
