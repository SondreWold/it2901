import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import Employee from "../Employee";

// pass snapshot.isDraggingOver as a prop to make conditional animations
class BaseCardList extends Component {
  render() {
    return (
      <div className="baseCardList">
        <Droppable droppableId={this.props.dragBase.id}>
          {(provided, snapshot) => (
            <div
              className="employeeList"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {this.props.dragEmployees.map((employee, index) => (
                <Employee key={employee.id} employee={employee} index={index} />
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
