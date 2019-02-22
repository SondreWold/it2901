import React, { Component } from "react";
import initialData from "./dummy_data.js";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import styled from "styled-components";


const Container = styled.div`
	display: flex;
`;

// TODO: Replace this.state with this.props.data and connect with redux

class BaseCardHolder extends Component {

	state = initialData;

	// this is the place to call the API endpoint to notify of reorder after handleDragging() completes
	onDragEnd = result => {
		this.handleDragging(result);
	};

	handleDragging = (result) => {
		const { destination, source, draggableId } = result;
		if (!destination) {
			return
		}

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		const start = this.state.columns[source.droppableId];
		const finish = this.state.columns[destination.droppableId];

		// when an item is dropped in the same column
		if (start === finish){
			const newTaskIds = Array.from(start.employeeIds);
			newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, draggableId);

			const newColumn = {
				...start,
				employeeIds: newTaskIds,
			};

			const newState = {
				...this.state,
				columns: {
					...this.state.columns,
					[newColumn.id]: newColumn,
				},
			};

			this.setState(newState);
			return;
		}
		const startTaskIds = Array.from(start.employeeIds);
		startTaskIds.splice(source.index, 1);
		const newStart = {
			...start,
			employeeIds: startTaskIds,
		};

		const finishTaskIds = Array.from(finish.employeeIds);
		finishTaskIds.splice(destination.index, 0, draggableId);
		const newFinish = {
			...finish,
			employeeIds: finishTaskIds,
		};

		const newState = {
			...this.state,
			columns: {
				...this.state.columns,
				[newStart.id]: newStart,
				[newFinish.id]: newFinish,
			},
		};
		this.setState(newState);
		console.log(this.state);
	}

  render() {
    return (
    	// NB! Advised to wrap entire app in DragDropContext: https://github.com/atlassian/react-beautiful-dnd#dragdropcontext
    	<DragDropContext onDragEnd={this.onDragEnd}>
    		<Container>
		    	{this.state.columnOrder.map(columnId => {
			    	const column = this.state.columns[columnId];
			    	const employees = column.employeeIds.map(employeeId => this.state.employees[employeeId]);

			    	return <Column key={column.id} column={column} employees={employees} />;
		    	})}
	    	</Container>
    	</DragDropContext>
    );
  }

}

export default BaseCardHolder;