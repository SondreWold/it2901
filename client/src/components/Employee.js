import React, { Component } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import Colors from "../constants/Colors";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props =>
    props.isDragging ? Colors.EmployeeColors.selectedEmployee : "white"};
  display: flex;
  transition: 0.15s;
`;

const HandleRegular = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${Colors.EmployeeColors.moveableEmployee};
  border-radius: 10px;
  margin-right: 8px;
`;

const HandleTemp = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${Colors.EmployeeColors.tempEmployee};
  border-radius: 10px;
  margin-right: 8px;
`;

class Employee extends Component {
  render() {
    return (
      <Draggable
        draggableId={this.props.employee.employee_id}
        index={this.props.index}
      >
        {(provided, snapshot) => (
          <Container
            className="employeeCard"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {this.props.employee.position === 2 ? (
              <HandleTemp />
            ) : (
              <HandleRegular />
            )}
            {this.props.employee.first_name}
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Employee;
