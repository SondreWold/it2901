import React, { Component } from "react";
import { connect } from "react-redux";
import EmployeesContainer from "./EmployeeList/EmployeesContainer";
import { getEmployees } from "../actions/contentActions/contentEmployeeActions";

class EmployeesContentContainer extends Component {
  componentDidMount() {
    this.props.getEmployees();
  }
  render() {
    return (
      <div>
        <EmployeesContainer
          employees={this.props.listOfEmployees}
          selectedEmployee={this.props.selectedEmployee}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getEmployees: name => dispatch(getEmployees(name))
  };
};

const mapStateToProps = state => ({
  listOfEmployees: state.contentEmployee.employees,
  selectedEmployee: state.employeeList.selectedEmployee
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeesContentContainer);
