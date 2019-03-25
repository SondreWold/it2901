import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  changeMovedEmployee,
  addMovedEmployee
} from "../actions/movedEmployeeAction";
import { updateAbsentChildren } from "../actions/contentActions/contentAbsenceChildrenActions";
import { updateRatio } from "../actions/statsActions/updateRatioAction";

import { DragDropContext } from "react-beautiful-dnd";
import "../components/BaseCard/BaseCard.css";
import BaseCard from "../components/BaseCard/BaseCard";
import BaseCardList from "../components/BaseCard/BaseCardList";
import ChildrenCounter from "../components/BaseCard/ChildrenCounter";
import EmployeesAtBase from "../components/BaseCard/EmployeesAtBase";
import EmployeesNeeded from "../components/BaseCard/EmployeesNeeded";
import "../components/BaseCard/BaseCard.css";
import Adder from "../components/BaseCard/Adder";
import Colors from "../constants/Colors";

class BaseCardContainer extends Component {
  colorRendering = value => {
    let color = Colors.BaseColors.ok;
    if (value >= 0) {
      color = Colors.BaseColors.good;
    } else if (value < -1) {
      color = Colors.BaseColors.bad;
    }
    return color;
  };

  onDragEnd = result => {
    this.props.changeMovedEmployee(
      result,
      this.props.employees,
      this.props.moved_employees,
      moment(this.props.date).format("YYYY-MM-DD")
    );
  };

  render() {
    return (
      this.props.absentChildren.length > 0 && (
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="baseCardHolder">
            {/*mapper gjennom baser og lager basecards*/}
            {this.props.bases.map(base => {
              const absentChildren = this.props.absentChildren.find(
                absence => absence.base_id === base.id
              );

              const employeeListAtBase = this.props.working_employees
                .filter(employee => employee.base_id === base.id)
                .sort(function(a, b) {
                  return (
                    a.position - b.position || a.employee_id - b.employee_id
                  );
                });

              // calc of needed employees
              const employeesPresent = employeeListAtBase.length;
              const childrenPresent =
                absentChildren.total_children - absentChildren.children;
              const ratio = Number(
                (employeesPresent - childrenPresent * base.ratio).toFixed(2)
              );
              const baseEmployeeNumber = base.total_children * base.ratio;
              const color = this.colorRendering(ratio);

              return (
                <BaseCard title={base.name} color={color}>
                  <ChildrenCounter
                    base={absentChildren.base_id}
                    absent={absentChildren.children}
                    total={absentChildren.total_children}
                    date={moment(absentChildren.date).format("YYYY-MM-DD")}
                    update={this.props.updateAbsentChildren}
                  />
                  <EmployeesAtBase
                    baseEmployees={baseEmployeeNumber}
                    employeesPresent={employeesPresent}
                    absentEmployees={this.props.absentEmployees}
                    base={base}
                    employees={this.props.employees}
                    date={this.props.date}
                  />
                  <EmployeesNeeded 
                  	ratio={ratio} 
                  	baseId={base.id}
                  	updateRatio={this.props.updateRatio}
                  	date={this.props.date}
                  />

                  <BaseCardList
                    key={base.id}
                    base={base}
                    employeeListAtBase={employeeListAtBase}
                  />
                  <Adder
                    freeTemps={this.props.freeTemps}
                    base={base}
                    addTempToBase={this.props.addMovedEmployee}
                    date={moment(absentChildren.date).format("YYYY-MM-DD")}
                  />
                </BaseCard>
              );
            })}
          </div>
        </DragDropContext>
      )
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateAbsentChildren: (amount, baseId, date) =>
      dispatch(updateAbsentChildren(amount, baseId, date)),
    changeMovedEmployee: (result, employees, moved_employees, date) =>
      dispatch(changeMovedEmployee(result, employees, moved_employees, date)),
    addMovedEmployee: (employeeId, baseId, date, name) =>
      dispatch(addMovedEmployee(employeeId, baseId, date, name)),
    updateRatio: (date, baseId, ratio) =>
    	dispatch(updateRatio(date, baseId, ratio))

  };
};

const mapStateToProps = state => ({
  bases: state.contentBase.bases,
  moved_employees: state.movedEmployee.data,
  working_employees: state.workingEmployees.data,
  employees: state.contentEmployee.employees,
  absentEmployees: state.contentAbsentEmployees.absentEmployees,
  date: state.date.selectedDate,
  absentChildren: state.contentAbsentChildren.absentChildren,
  freeTemps: state.contentEmployee.freeTemps
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseCardContainer);
