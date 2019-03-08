import React, { Component } from "react";
import EmployeeList from "../../components/EmployeeList/EmployeeList";
import DetailedEmployee from "../../components/DetailedEmployee/DetailedEmployee";
import EmployeeRegisterAbsence from "../../components/EmployeeRegisterAbsence";

class EmployeesContainer extends Component {
  render() {
    return (
      <div style={style.container}>
        <div style={style.item}>
          <EmployeeList employees={this.props.employees} />
        </div>
        <div style={style.item}>
          {this.props.selectedEmployee && (
            <div>
              <DetailedEmployee
                selectedEmployee={this.props.selectedEmployee}
              />
              <EmployeeRegisterAbsence />
            </div>
          )}
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

export default EmployeesContainer;
