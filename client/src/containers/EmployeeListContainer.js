import React, { Component } from "react";
import { connect } from "react-redux";
import EmployeeList from "../components/EmployeeList/EmployeeList";

class EmployeesContainer extends Component {
  render() {
    return (
      <div>
        <EmployeeList
          employees={this.props.employees}
          updateSelectedEmployee={this.props.updateSelectedEmployee}
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
