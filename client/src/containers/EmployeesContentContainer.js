import React, { Component } from "react";
import { connect } from "react-redux";
import { insertAbsentEmployee } from "../actions/contentActions/contentAbsenceEmployeeActions";
import {
  updateSelectedEmployee,
  getSelectedBase
} from "../actions/EmployeeListActions/EmployeeListActions";
import { getSearchEmployees } from "../actions/contentActions/contentEmployeeActions";
import { getBases } from "../actions/contentActions/contentBaseActions";
import EmployeeList from "../components/EmployeeList/EmployeeList";
import EmployeeDetailContainer from "./EmployeeDetailContainer";
import { getAbsenceById } from "../actions/contentActions/contentAbsenceEmployeeActions";
import "./employeesContentContainer.css";

class EmployeesContentContainer extends Component {
  componentDidMount() {
    this.props.getSearchEmployees();
    this.props.getBases();
  }

  componentWillUnmount() {
    this.props.updateSelectedEmployee("");
  }

  render() {
    return (
      <div className="container">
        <div className="item">
          <EmployeeList
            employees={this.props.listOfEmployees}
            getSearchEmployees={this.props.getSearchEmployees}
            selectedEmployee={this.props.selectedEmployee}
            updateSelectedEmployee={this.props.updateSelectedEmployee}
            bases={this.props.bases}
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
            bases={this.props.bases}
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
    getAbsence: id => dispatch(getAbsenceById(id)),
    getBases: url => dispatch(getBases())
  };
};

const mapStateToProps = state => ({
  listOfEmployees: state.contentEmployee.searchData,
  selectedEmployee: state.employeeList.selectedEmployee,
  minDate: state.date.minDate,
  selectedBase: state.employeeList.selectedBase,
  absence: state.absence.data,
  loading: state.absence.loading,
  bases: state.contentBase.bases
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeesContentContainer);
