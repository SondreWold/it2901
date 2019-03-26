import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  addMovedEmployee,
  updateMovedEmployee,
  deleteMovedEmployee
} from "../actions/movedEmployeeAction";
import {
  updateWorkingEmployeesBase,
  addWorkingEmployeesBase
} from "../actions/workingEmployeesAction";
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

  deleteTemp = (id, date, baseId, index) => {
    const changedBase = remove(this.props.working_employees[baseId], index);
    this.props.updateWorkingEmployeesBase(changedBase, baseId);
    this.props.deleteMovedEmployee(id, date);
  };

  onDragEnd = result => {
    const { source, destination, draggableId } = result;
    const employee = this.props.employees.find(emp => emp.id === draggableId);
    let sourceList = this.props.working_employees[source.droppableId];

    // dropped outside the list
    if (!destination) {
      return;
    }

    // reorder inside list
    else if (source.droppableId === destination.droppableId) {
      const changedBase = reorder(sourceList, source.index, destination.index);
      this.props.updateWorkingEmployeesBase(changedBase, source.droppableId);
    }

    // move to different list
    else {
      let destList = this.props.working_employees[destination.droppableId];
      //if the destination list is empty
      if (!destList) {
        this.props.addWorkingEmployeesBase(String(destination.droppableId));
        destList = [];
      }
      const changedBases = move(sourceList, destList, source, destination);
      this.props.updateWorkingEmployeesBase(
        changedBases[destination.droppableId],
        destination.droppableId
      );
      this.props.updateWorkingEmployeesBase(
        changedBases[source.droppableId],
        source.droppableId
      );
      this.props.moved_employees.find(emp => emp.employee_id === draggableId);
      if (
        this.props.moved_employees.find(emp => emp.employee_id === draggableId)
      ) {
        if (
          employee.position === 1 &&
          employee.base_id === destination.droppableId
        ) {
          //moving full time employee back to its default base
          this.props.deleteMovedEmployee(
            draggableId,
            moment(this.props.date).format("YYYY-MM-DD")
          );
        } else {
          // moving a temp
          this.props.updateMovedEmployee(
            draggableId,
            destination.droppableId,
            moment(this.props.date).format("YYYY-MM-DD")
          );
        }
      } else {
        //moving a full time employee away from its default base
        this.props.addMovedEmployee(
          draggableId,
          destination.droppableId,
          moment(this.props.date).format("YYYY-MM-DD"),
          false
        );
      }
    }
  };

  render() {
    return (
      this.props.absentChildren.length > 0 &&
      this.props.working_employees && (
        <DragDropContext onDragEnd={this.onDragEnd}>
          {console.log(this.props.working_employees)}
          <div className="baseCardHolder">
            {/*mapper gjennom baser og lager basecards*/}
            {this.props.bases.map(base => {
              const absentChildren = this.props.absentChildren.find(
                absence => absence.base_id === base.id
              );

              const employeeListAtBase = this.props.working_employees[
                String(base.id)
              ]
                ? this.props.working_employees[String(base.id)]
                : [];

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
                    delete={this.deleteTemp}
                    date={this.props.date}
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

const remove = (list, index) => {
  const listClone = Array.from(list);
  listClone.splice(index, 1);
  return listClone;
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const mapDispatchToProps = dispatch => {
  return {
    updateAbsentChildren: (amount, baseId, date) =>
      dispatch(updateAbsentChildren(amount, baseId, date)),
    addMovedEmployee: (employeeId, baseId, date, name) =>
      dispatch(addMovedEmployee(employeeId, baseId, date, name)),
    updateWorkingEmployeesBase: (data, base) =>
      dispatch(updateWorkingEmployeesBase(data, base)),
    updateMovedEmployee: (employeeId, baseId, date) =>
      dispatch(updateMovedEmployee(employeeId, baseId, date)),
    updateRatio: (date, baseId, ratio) =>
      dispatch(updateRatio(date, baseId, ratio)),
    deleteMovedEmployee: (employeeId, date) =>
      dispatch(deleteMovedEmployee(employeeId, date)),
    addWorkingEmployeesBase: base => dispatch(addWorkingEmployeesBase(base))
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
