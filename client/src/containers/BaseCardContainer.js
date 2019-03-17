import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { formatAndUpdateData } from "../actions/dragDataAction";
import { updateMovedEmployee } from "../actions/movedEmployeeAction";
import { updateAbsentChildren } from "../actions/contentActions/contentAbsenceChildrenActions";
import { addTempToBase } from "../actions/contentActions/contentEmployeeActions";

import { DragDropContext } from "react-beautiful-dnd";

import BaseCard from "../components/BaseCard/BaseCard";
import "../components/BaseCard/BaseCard.css";

class BaseCardContainer extends Component {
  componentDidUpdate(prevProps) {
    if (
      prevProps.bases !== this.props.bases ||
      prevProps.moved_employees !== this.props.moved_employees ||
      prevProps.employees !== this.props.employees ||
      prevProps.absentChildren !== this.props.absentChildren
    ) {
      this.props.formatAndUpdateData(
        this.props.moved_employees,
        this.props.bases,
        this.props.employees
      );
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
    this.props.updateMovedEmployee(baseId, employeeId, date);
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
                  addTempToBase={this.props.addTempToBase}
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
    addTempToBase: (date, employeeId, baseId) =>
      dispatch(addTempToBase(date, employeeId, baseId))
  };
};

const mapStateToProps = state => ({
  data: state.dragData.data,
  bases: state.contentBase.bases,
  moved_employees: state.movedEmployee.data,
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
