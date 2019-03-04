import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import BaseCard from "../components/BaseCard";

import { formatAndUpdateData } from "../actions/dragDataAction";

import { connect } from "react-redux";
import { updateMovedEmployee } from "../actions/movedEmployeeAction";
import { updateAbsentChildren } from "../actions/contentActions/contentAbsenceChildrenActions";

import moment from "moment";

// TODO: Replace this.state with this.props.data and connect with redux

class BaseCardContainer extends Component {
  componentDidUpdate(prevProps) {
    if (
      prevProps.bases !== this.props.bases ||
      prevProps.moved_employees !== this.props.moved_employees ||
      prevProps.employees !== this.props.employees
    ) {
      console.log(this.props.moved_employees);
      this.props.formatAndUpdateData(
        this.props.moved_employees,
        this.props.bases,
        this.props.employees
      );
    }
  }

  // this is the place to call the API endpoint to notify of reorder after handleDragging() completes
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


  calculateBaseId = temporaryValue => {
    let base = temporaryValue+1;
    return base;
  }

  render() {
    return (
      // NB! Advised to wrap entire app in DragDropContext: https://github.com/atlassian/react-beautiful-dnd#dragdropcontext

      <DragDropContext onDragEnd={this.onDragEnd}>
        <div style={Container}>
          {this.props.data.columnOrder.map(columnId => {
            const column = this.props.data.columns[columnId];
            const employees = column.employeeIds.map(
              employeeId => this.props.data.employees[employeeId]
            );
            const currentBase = this.calculateBaseId(this.props.data.columnOrder.indexOf(columnId));

            return this.props.absentChildren.length > 0 ? (
              <BaseCard
                key={column.id}
                column={column}
                employees={this.props.employees}
                absentEmployees={this.props.absentEmployees}
                base={currentBase}
                date={this.props.date}
                absence={
                  this.props.absentChildren[
                    this.props.data.columnOrder.indexOf(columnId)
                  ]
                }
                update={this.props.updateAbsentChildren}
              />
            ) : (
              <div>lol</div>
            );
          })}
        </div>
      </DragDropContext>
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
