import React, { Component } from "react";
import { connect } from "react-redux";
import EmployeeListContainer from "./EmployeeList/EmployeesContainer";
import { getEmployees } from "../actions/contentActions/contentEmployeeActions";
import AddEmployee from "../components/EmployeeTools/AddEmployee";

class EmployeesContentContainer extends Component {
  componentDidMount() {
    this.props.getEmployees();
  }
  render() {
    return (
      <div>
        <AddEmployee/>
        <EmployeeListContainer employees={this.props.listOfEmployees} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getEmployees: url => dispatch(getEmployees())
  };
};

const mapStateToProps = state => ({
  listOfEmployees: state.contentEmployee.employees
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeesContentContainer);
