import React, { Component } from "react";
import BaseCardHolder from './BaseCardHolder';


class BaseOverview extends Component {


	// parses the query output into something that is usable by the DragDropContext
	formatQuery = (moved_employees, bases, employees) => {
		let data = { employees: {}, columns: {}, columnOrder: []};
		
		employees.forEach( (e) => {
			const id = "employee-" + e.id;
			data.employees[id] = { id: id, content: e.first_name};
		});
		bases.forEach( (b) => {
			const id = "column-" + b.id; 
			data.columnOrder.push(id);
			data.columns[id] = { id: id, title: b.name, employeeIds: []}
		});

  	for (let i = 0; i < moved_employees.length; i++) {
  		for (let j = 0; j < bases.length; j++){
  			if (moved_employees[i].base_id === bases[j].id){ 
  				data.columns["column-" + bases[j].id].employeeIds.push("employee-" + moved_employees[i].employee_id)
  			};
  		};
  	};

  	return data;
	}

  render() {
		const formatted_data = this.formatQuery(this.props.moved_employees, this.props.bases, this.props.employees)
  	return(
  		<div>
  			<BaseCardHolder date={this.props.date} data={formatted_data}/>
			</div>
  	);
  }

}

export default BaseOverview;