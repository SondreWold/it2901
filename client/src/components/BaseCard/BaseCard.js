import React, { Component } from "react";
import BaseCardList from "./BaseCardList";
import BaseCardHeader from "./BaseCardHeader";
import moment from "moment";
import ChildrenPresent from "./ChildrenPresent";
import ChildrenAbsentIncDec from "./ChildrenAbsentIncDec";
import EmployeesAtBase from "./EmployeesAtBase";

class BaseCard extends Component {

  calculateEmployeesAtBase = () => {
    var employees = [];
    let totalEmployeesAtBase = 0;
    let absentEmployeesAtBase = 0;
    this.props.employees.map(employee => {
      if(employee.base_id === this.props.base.id) {
        totalEmployeesAtBase++;
        if(this.props.absentEmployees.length > 0) {
        this.props.absentEmployees.map(absent => {
          if((absent.employee_id === employee.id) &&
            (moment(this.props.date).format("YYYY-MM-DD") ===
            moment(absent.date).format("YYYY-MM-DD"))) {
              console.log(((absent.employee_id === employee.id) &&
                (moment(this.props.date).format("YYYY-MM-DD") ===
                moment(absent.date).format("YYYY-MM-DD"))));
              absentEmployeesAtBase++;
          }});
        }
      }
    });
    employees.push(totalEmployeesAtBase, absentEmployeesAtBase);
    return employees;
  }

  render() {
    let employeesAtBase = this.calculateEmployeesAtBase();
    return (
      <div style={Container}>
        <BaseCardHeader baseName={this.props.base.name} />
        <ChildrenPresent
          base={this.props.absence.base_id}
          absent={this.props.absence.children}
          totalChildren={this.props.absence.total_children}
        />
        <ChildrenAbsentIncDec
          base={this.props.absence.base_id}
          absent={this.props.absence.children}
          date={moment(this.props.absence.date).format("YYYY-MM-DD")}
          totalChildren={this.props.absence.total_children}
          update={this.props.update}
        />
        <EmployeesAtBase baseEmployees={employeesAtBase} />
        <BaseCardList
          key={this.props.dragBase.id}
          dragBase={this.props.dragBase}
          dragEmployees={this.props.dragEmployees}
        />
      </div>
    );
  }
}

export default BaseCard;

const Container = {
  border: "1px solid black",
  borderRadius: "5px",
  margin: "10px",
  minHeight: "300px"
};
