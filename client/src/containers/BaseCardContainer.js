import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { updateMovedEmployee } from "../actions/movedEmployeeAction";
import { updateAbsentChildren } from "../actions/contentActions/contentAbsenceChildrenActions";
import { addMovedEmployee } from "../actions/movedEmployeeAction";
import { DragDropContext } from "react-beautiful-dnd";
import BaseCard from "../components/BaseCard/BaseCard";
import "../components/BaseCard/BaseCard.css";

class BaseCardContainer extends Component {
  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    //Dropp utenfor baser
    if (!destination) {
      return;
    }

    //Dropp nedover i samme base
    else if (
      destination.droppableId === source.droppableId &&
      destination.index !== source.index
    ) {
      return;
    }

    //Dropp i annen base
    else {
      const name = this.props.employees.find(
        employee => employee.id === draggableId
      ).first_name;
      const date = moment(this.props.date).format("YYYY-MM-DD");
      if (
        this.props.moved_employees
          .map(mov => mov.employee_id)
          .includes(draggableId)
      ) {
        this.props.updateMovedEmployee(
          draggableId,
          destination.droppableId,
          date,
          name
        );
      } else {
        this.props.addMovedEmployee(
          draggableId,
          destination.droppableId,
          date,
          name
        );
      }
    }
  };

  render() {
    console.log(this.props.working_employees);
    return (
      this.props.absentChildren.length > 0 && (
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="baseCardHolder">
            {/*mapper gjennom baser og lager basecards*/}
            {this.props.bases.map(base => {
              const absentChildren = this.props.absentChildren.find(
                absence => absence.base_id === base.id
              );

              const employeesAtBase = this.props.working_employees.filter(
                employee => employee.base_id === base.id
              );
              employeesAtBase.sort(function(a, b) {
                return a.position - b.position || a.employee_id - b.employee_id;
              });

              return (
                <BaseCard
                  base={base}
                  employeesAtBase={employeesAtBase}
                  absence={absentChildren}
                  absentEmployees={this.props.absentEmployees}
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
    updateMovedEmployee: (employeeId, baseId, date, name) =>
      dispatch(updateMovedEmployee(employeeId, baseId, date, name)),
    updateAbsentChildren: (amount, baseId, date) =>
      dispatch(updateAbsentChildren(amount, baseId, date)),
    addMovedEmployee: (employeeId, baseId, date, name) =>
      dispatch(addMovedEmployee(employeeId, baseId, date, name))
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
