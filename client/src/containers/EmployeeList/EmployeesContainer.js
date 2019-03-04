import React, { Component } from "react";
import EmployeeList from "../../components/EmployeeList/EmployeeList";
import DetailedEmployee from "../../components/DetailedEmployee/DetailedEmployee";

class EmployeesContainer extends Component {
  render() {
    return (
      <div style={style.container}>
        <div style={style.item}>
          <EmployeeList employees={this.props.employees} />
        </div>
        <div style={style.item}>
          <DetailedEmployee />
        </div>
      </div>
    );
  }
}

const style = {
  container: {
    margin: "30px",
    display: "flex",
    flexDirection: "row"
  },
  item: {
    flex: "100%"
  }
};

export default EmployeesContainer;
