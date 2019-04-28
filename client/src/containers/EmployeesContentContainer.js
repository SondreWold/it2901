import React, { Component } from "react";
import { connect } from "react-redux";
import { insertAbsentEmployee } from "../actions/contentActions/contentAbsenceEmployeeActions";
import {
  updateSelectedEmployee,
  getSelectedBase
} from "../actions/EmployeeListActions/EmployeeListActions";
import { getSearchEmployees } from "../actions/contentActions/contentEmployeeActions";
import EmployeeListContainer from "./EmployeeListContainer";
import EmployeeDetailContainer from "./EmployeeDetailContainer";
import { getAbsenceById } from "../actions/contentActions/contentAbsenceEmployeeActions";
import "./employeesContentContainer.css";

class EmployeesContentContainer extends Component {
  componentDidMount() {
    this.props.getSearchEmployees();
  }

  componentWillUnmount() {
    this.props.updateSelectedEmployee("");
  }

  render() {
    return (
      <div className="container">
        <div className="item">
          <EmployeeListContainer
            employees={this.props.listOfEmployees}
            getSearchEmployees={this.props.getSearchEmployees}
            selectedEmployee={this.props.selectedEmployee}
            updateSelectedEmployee={this.props.updateSelectedEmployee}
          />
        </div>
        <div className="item">
          <EmployeeDetailContainer
            loading={this.props.loading}
            getAbsence={this.props.getAbsence}
            absence={this.props.absence}
            selectedEmployee={this.props.selectedEmployee}
            insertAbsentEmployee={this.props.insertAbsentEmployee}
            minDate={this.props.minDate}
            getSelectedBase={this.props.getSelectedBase}
            selectedBase={this.props.selectedBase}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSearchEmployees: name => dispatch(getSearchEmployees(name)),
    updateSelectedEmployee: employee =>
      dispatch(updateSelectedEmployee(employee)),
    insertAbsentEmployee: (empId, date) =>
      dispatch(insertAbsentEmployee(empId, date)),
    getSelectedBase: id => dispatch(getSelectedBase(id)),
    getAbsence: id => dispatch(getAbsenceById(id))
  };
};

const mapStateToProps = state => ({
  listOfEmployees: state.contentEmployee.searchData,
  selectedEmployee: state.employeeList.selectedEmployee,
  minDate: state.date.minDate,
  selectedBase: state.employeeList.selectedBase,
  absence: state.absence.data,
  loading: state.absence.loading
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeesContentContainer);
