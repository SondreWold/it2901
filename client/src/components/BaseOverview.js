import React, { Component } from "react";
import BaseCardHolder from './BaseCardHolder';


class BaseOverview extends Component {


	// parses the query output into something that is usable by the DragDropContext
	formatQuery = (bases, employees) => {
		let data = { employees: {}, columns: {}, columnOrder: []};
		employees.map( (e) => {
			const id = "employee-" + e.id;
			data.employees[id] = { id: id, content: e.first_name};
		});
		bases.map( (b) => {
			const id = "column-" + b.id; 
			data.columnOrder.push(id);
			data.columns[id] = { id: id, title: b.name, employeeIds: []}
		});

  	for (let i = 0; i < employees.length; i++) {
  		for (let j = 0; j < bases.length; j++){
  			if (employees[i].base_id === bases[j].id){ 
  				// console.log(data.columns)
  				data.columns["column-" + bases[j].id].employeeIds.push("employee-" + employees[i].id)
  			};
  		};
  	};

  	return data;
	}

  render() {
		const formatted_data = this.formatQuery(this.props.bases, this.props.employees)
  	return(
  		<div>
  			<h1> Here goes the BaseHeader comp </h1>
  			<BaseCardHolder data={formatted_data}/>
			</div>
  	);
  }

}

export default BaseOverview;


/*
const initialData = {


    employees: {
    	"employee-1": { id: "employee-1", content: "Aksel Andersen" },
    	"employee-2": { id: "employee-2", content: "Beate Brun" },
    	"employee-3": { id: "employee-3", content: "Charlotte Chill" },
    	"employee-4": { id: "employee-4", content: "Dorthe Dor" },
    	"employee-5": { id: "employee-5", content: "Eivind Eiriksen" },
    	"employee-6": { id: "employee-6", content: "Fredrik Fisk" },
    	"employee-7": { id: "employee-7", content: "Geir Gudmundsen" },
    	"employee-8": { id: "employee-8", content: "Henriette Hågård" },
    },

      columns : {

    	"column-1": {
    		id: "column-1",
    		title: "",
    		employeeIds: ["employee-1", "employee-2","employee-3", "employee-4"]
    	},
    	"column-2": {
    		id: "column-2",
    		title: "In progress",
    		employeeIds: ["employee-5", "employee-6"]
    	},
    	"column-3": {
    		id: "column-3",
    		title: "Done",
    		employeeIds: ["employee-7", "employee-8"]
    	}
    },

    // facilitate reordering
    columnOrder: ["column-1", "column-2", "column-3"],
}
*/