import React, { Component } from "react";

import { connect } from "react-redux";
import moment from "moment";

import { formatAndUpdateData } from "../actions/dragDataAction";
import { updateMovedEmployee } from "../actions/movedEmployeeAction";
import { updateAbsentChildren } from "../actions/contentActions/contentAbsenceChildrenActions";

import { DragDropContext } from "react-beautiful-dnd";
import BaseCard from "../components/BaseCard/BaseCard";

class BaseCardContainer extends Component {
  componentDidUpdate(prevProps) {
    if (
      prevProps.bases !== this.props.bases ||
      prevProps.moved_employees !== this.props.moved_employees ||
      prevProps.employees !== this.props.employees
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
      /* For rearranging items within the same column. For now, nothing happens

			const newEmployeeIds = Array.from(start.employeeIds);
			newEmployeeIds.splice(source.index, 1);
			newEmployeeIds.splice(destination.index, 0, draggableId);

			const newColumn = {
				...start,
				employeeIds: newEmployeeIds,
			};
			const newState = {
				...this.props.data,
				columns: {
					...this.props.data.columns,
					[newColumn.id]: newColumn,
				},
			};
		*/
      return;
    }
    // if dest column is different than source column
    const employeeId = result.draggableId.substr(-1);
    const baseId = result.destination.droppableId.substr(-1);
    const date = moment(this.props.date).format("YYYY-MM-DD");
    this.props.updateMovedEmployee(baseId, employeeId, date);
  };

  calculateEmployeesAtBase = base => {
    var employees = [];
    let totalEmployeesAtBase = 0;
    let absentEmployeesAtBase = 0;
    this.props.employees.map(employee => {
      if (employee.base_id === base) {
        totalEmployeesAtBase++;
        if (this.props.absentEmployees.length > 0) {
          this.props.absentEmployees.map(absent => {
            if (
              absent.employee_id === employee.id &&
              moment(this.props.date).format("YYYY-MM-DD") ==
                moment(absent.date).format("YYYY-MM-DD")
            ) {
              absentEmployeesAtBase++;
            }
          });
        }
      }
    });
    employees.push(totalEmployeesAtBase, absentEmployeesAtBase);
    return employees;
  };

  render() {
    return (
      this.props.data &&
      this.props.absentChildren.length > 0 && (
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div style={Container}>
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
              const baseEmployees = this.calculateEmployeesAtBase(base.id);

              return (
                <BaseCard
                  base={base}
                  dragBase={dragBase}
                  dragEmployees={dragEmployees}
                  absence={absentChildren}
                  baseEmployees={baseEmployees}
                  update={this.props.updateAbsentChildren}
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
      dispatch(updateAbsentChildren(amount, baseId, date))
  };
};

const mapStateToProps = state => ({
  data: state.dragData.data,
  bases: state.contentBase.bases,
  moved_employees: state.movedEmployee.data,
  employees: state.contentEmployee.employees,
  absentEmployees: state.contentAbsentEmployees.absentEmployees,
  date: state.date.selectedDate,
  absentChildren: state.contentAbsentChildren.absentChildren
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseCardContainer);

const Container = {
  display: "flex",
  justifyContent: "space-around"
};
