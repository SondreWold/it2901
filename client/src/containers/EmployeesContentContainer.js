import React, { Component } from "react";
import { connect } from "react-redux";
import EmployeeListContainer from "./EmployeeList/EmployeesContainer";
import { getEmployees } from "../actions/contentActions/contentEmployeeActions";

class EmployeesContentContainer extends Component {
  componentDidMount() {
    this.props.getEmployees();
  }
  render() {
    return (
      <div>
        <EmployeeListContainer employees={this.props.listOfEmployees} />
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
  listOfEmployees: state.contentEmployee.employees
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeesContentContainer);
