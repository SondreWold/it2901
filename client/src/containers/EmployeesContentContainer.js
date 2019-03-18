import React, { Component } from "react";
import { connect } from "react-redux";
import { insertAbsentEmployee } from "../actions/insertAbsentEmployeeAction";
import { updateSelectedEmployee } from "../actions/EmployeeListActions/EmployeeListActions";
import { getSearchEmployees } from "../actions/contentActions/contentEmployeeActions";
import EmployeeListContainer from "./EmployeeListContainer";
import EmployeeDetailContainer from "./EmployeeDetailContainer";

class EmployeesContentContainer extends Component {
  componentDidMount() {
    this.props.getSearchEmployees();
  }
  render() {
    console.log(this.props.listOfEmployees);
    return (
      <div style={style.container}>
        <div style={style.item}>
          <EmployeeListContainer
            employees={this.props.listOfEmployees}
            getSearchEmployees={this.props.getSearchEmployees}
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
    getSearchEmployees: name => dispatch(getSearchEmployees(name)),
    updateSelectedEmployee: employee =>
      dispatch(updateSelectedEmployee(employee)),
    insertAbsentEmployee: (empId, date) =>
      dispatch(insertAbsentEmployee(empId, date))
  };
};

const mapStateToProps = state => ({
  listOfEmployees: state.contentEmployee.searchData,
  selectedEmployee: state.employeeList.selectedEmployee,
  minDate: state.date.minDate
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeesContentContainer);
