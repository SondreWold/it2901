import React, { Component } from "react";
import { connect } from "react-redux";
import EmployeeList from "../components/EmployeeList/EmployeeList";
import "../components/EmployeeDetails/EmployeeDetails.css";

class EmployeesContainer extends Component {
	render() {
    return (
      <div className="detailsContainer">
        <EmployeeList
          employees={this.props.employees}
          updateSelectedEmployee={this.props.updateSelectedEmployee}
          selectedEmployee={this.props.selectedEmployee}
          getSearchEmployees={this.props.getSearchEmployees}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeesContainer);
