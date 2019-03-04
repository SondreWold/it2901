import React, { Component } from "react";
import { connect } from "react-redux";
import EmployeeList from "../../components/EmployeeList/EmployeeList";
import { getEmployees } from "../../actions/contentActions/contentEmployeeActions";

class EmployeeListContainer extends Component {
  componentDidMount() {
    this.props.getEmployees();
  }
  render() {
    return (
      <div>
        <EmployeeList employees={this.props.listOfEmployees} />
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
)(EmployeeListContainer);
