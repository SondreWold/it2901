import React, { Component } from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Employee from "./Employee";

const Container = styled.div`
	margin: 8px;
	border: 1px solid lightgrey;
	border-radius: 2px;
	width: 220px;

	display: flex;
	flex-direction: column;
	overflow: scroll;
`

const EmployeeList = styled.div`
	padding: 8px;
	transition: background-color 0.2s ease;
	background-color: 'white';
	border: 1px solid white;
	border-color: ${props => (props.isDraggingOver ? 'blue' : 'white')}
	flex-grow: 1;
	min-height: 100px;
	max-height: 130px;
`

class Column extends Component {

  render() {
  	return(
	  	<Container>
	  		<Droppable droppableId={this.props.column.id}>
	  			{(provided, snapshot) => (
			  		<EmployeeList
			  			ref={provided.innerRef}
			  			{...provided.droppableProps}
			  			isDraggingOver={snapshot.isDraggingOver}
			  		>
			  			{this.props.employees.map((employee, index) => 
			  				<Employee key={employee.id} employee={employee} index={index}/>)}
			  			{provided.placeholder}
			  		</EmployeeList>
		  		)}
	    	</Droppable>
			</Container>
  	);
  }

}

export default Column;
