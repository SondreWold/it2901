import React, { Component } from "react";
import { Droppable } from "react-beautiful-dnd";
import Employee from "./Employee";

class BaseCardList extends Component {
  render() {
    return (
      <div style={Container}>
        <Droppable droppableId={this.props.dragBase.id}>
          {(provided, snapshot) => (
            <div
              style={EmployeeList}
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
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

const Container = {
  margin: "8px",
  border: "1px solid lightgrey",
  borderRadius: "2px",
  width: "220px",

  display: "flex",
  flexDirection: "column",
  overflow: "scroll"
};

const EmployeeList = {
  padding: "8px",
  transition: "background-color 0.2s ease",
  backgroundColor: "white",
  border: "1px solid white",
  borderColor: '${props => (props.isDraggingOver ? "blue" : "white")}',
  flexGrow: 1,
  minHeight: "100px",
  maxHeight: "130px"
};
