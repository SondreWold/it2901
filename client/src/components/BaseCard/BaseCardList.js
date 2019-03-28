import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import Employee from "../Employee";

class BaseCardList extends Component {
  render() {
    return (
      <div className="baseCardList">
        <Droppable droppableId={this.props.base.id.toString()}>
          {(provided, snapshot) => (
            <div
              className="employeeList"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {this.props.employeeListAtBase.map((employee, index) => (
                <Employee
                  key={employee.employee_id}
                  employee={employee}
                  index={index}
                  delete={this.props.delete}
                  date={this.props.date}
                  baseId={this.props.base.id}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}

export default BaseCardList;
