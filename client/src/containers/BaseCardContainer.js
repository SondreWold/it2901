import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { formatAndUpdateData } from "../actions/dragDataAction";
import { updateMovedEmployee } from "../actions/movedEmployeeAction";
import { updateAbsentChildren } from "../actions/contentActions/contentAbsenceChildrenActions";
import { addMovedEmployee } from "../actions/movedEmployeeAction";

import { DragDropContext } from "react-beautiful-dnd";

import BaseCard from "../components/BaseCard/BaseCard";
import "../components/BaseCard/BaseCard.css";

class BaseCardContainer extends Component {
  componentDidUpdate(prevProps) {
    if (
      prevProps.bases !== this.props.bases ||
      prevProps.working_employees !== this.props.working_employees ||
      prevProps.employees !== this.props.employees ||
      prevProps.absentChildren !== this.props.absentChildren ||
      prevProps.moved_employees !== this.props.moved_employees
    ) {
      this.props.formatAndUpdateData(
        this.props.working_employees,
        this.props.bases,
        this.props.employees
      );
    }
    if (prevProps.working_employees !== this.props.working_employees) {
      console.log(this.props.working_employees);
    }
  }

  onDragEnd = result => {
    this.handleDragging(result);
  };

  handleDragging = result => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const start = this.props.data.columns[source.droppableId];
    const finish = this.props.data.columns[destination.droppableId];

    // when an item is dropped in the same column
    if (start === finish) {
      return;
    }
    // if dest column is different than source column, gets correct id from DnD result object
    const employeeId = result.draggableId.split("-")[1];
    const baseId = result.destination.droppableId.split("-")[1];
    const date = moment(this.props.date).format("YYYY-MM-DD");
    if (
      this.props.moved_employees
        .map(mov => mov.employee_id)
        .includes(parseInt(employeeId))
    ) {
      this.props.updateMovedEmployee(baseId, employeeId, date);
    } else {
      this.props.addMovedEmployee(date, parseInt(employeeId), parseInt(baseId));
    }
  };

  render() {
    return (
      this.props.data &&
      this.props.absentChildren.length > 0 && (
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="baseCardHolder">
            {/*mapper gjennom baser og lager basecards*/}
            {this.props.bases.map(base => {
              const absentChildren = this.props.absentChildren.find(
                absence => absence.base_id === base.id
              );
              const dragBase = Object.values(this.props.data.columns).find(
                dragBase => dragBase.title === base.name
              );
              const dragEmployees = dragBase.employeeIds.map(
                employeeId => this.props.data.employees[employeeId]
              );

              dragEmployees.sort(function(a, b) {
                return (
                  a.id - b.id ||
                  a.position - b.position ||
                  a.moveable - b.moveable
                );
              });

              return (
                <BaseCard
                  base={base}
                  dragBase={dragBase}
                  dragEmployees={dragEmployees}
                  absence={absentChildren}
                  update={this.props.updateAbsentChildren}
                  date={this.props.date}
                  employees={this.props.employees}
                  freeTemps={this.props.freeTemps}
                  addTempToBase={this.props.addMovedEmployee}
                  key={base.id}
                />
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
    updateMovedEmployee: (baseId, employeeId, date) =>
      dispatch(updateMovedEmployee(baseId, employeeId, date)),
    formatAndUpdateData: (moved_employees, bases, employees) =>
      dispatch(formatAndUpdateData(moved_employees, bases, employees)),
    updateAbsentChildren: (amount, baseId, date) =>
      dispatch(updateAbsentChildren(amount, baseId, date)),
    addMovedEmployee: (date, employeeId, baseId) =>
      dispatch(addMovedEmployee(date, employeeId, baseId))
  };
};

const mapStateToProps = state => ({
  data: state.dragData.data,
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
