/*
	
	query should be something like this:

	select (employee.first_name, base.name) from employee, base, house where employee.base_id = base.id AND base.house_id = 1 order by base.name;

	(Emma,Bekkdalen)
	(Olivia,Bekkdalen)
	(Emilie,Bekkdalen)
	(Lea,Bekkdalen)
	(Ella,Gårdsbruket)
	(Sofie,Gårdsbruket)
	(Nora,Gårdsbruket)
	(Sara,Gårdsbruket)
	(Emil,Gåsedammen)
	(Oliver,Gåsedammen)
	(Lukas,Gåsedammen)
	(Jakob,Gåsedammen)
	(Noah,Steinbruddet)
	(Aksel,Steinbruddet)
	(Oskar,Steinbruddet)
	(Filip,Steinbruddet)
*/

const dummy = {
		employees: {
			"employee-1": 	{ id: "employee-1", content:"Lukas"},
			"employee-2": 	{ id: "employee-2", content:"Oliver"},
			"employee-3": 	{ id: "employee-3", content:"Emma"},
			"employee-4": 	{ id: "employee-4", content:"Olivia"},
			"employee-5": 	{ id: "employee-5", content:"Filip"}
		},
		columns: {
	    "column-1": {
	      id: "column-1",
	      title: "Gåsedammen",
	      employeeIds: [
	        "employee-1",
	        "employee-2",
	      ]
	    }
	  },

	  columnOrder: ["column-1"]
}

const initialData = {

		employees: {
			"employee-1": 	{ id: "employee-1", content:"Lukas"},
			"employee-2": 	{ id: "employee-2", content:"Oliver"},
			"employee-3": 	{ id: "employee-3", content:"Emma"},
			"employee-4": 	{ id: "employee-4", content:"Olivia"},
			"employee-5": 	{ id: "employee-5", content:"Filip"},
			"employee-6": 	{ id: "employee-6", content:"Oskar"},
			"employee-7": 	{ id: "employee-7", content:"Nora"},
			"employee-8": 	{ id: "employee-8", content:"Sara"},
			"employee-9": 	{ id: "employee-9", content:"Emil"},
			"employee-10": 	{ id: "employee-10", content:"Jakob"},
			"employee-11": 	{ id: "employee-11", content:"Emilie"},
			"employee-12": 	{ id: "employee-12", content:"Lea"},
			"employee-13": 	{ id: "employee-13", content:"Noah"},
			"employee-14": 	{ id: "employee-14", content:"Aksel"},
			"employee-15": 	{ id: "employee-15", content:"Sofie"},
			"employee-16": 	{ id: "employee-16", content:"Ella"}

		},

    columns: {
	    "column-1": {
	      id: "column-1",
	      title: "Gåsedammen",
	      employeeIds: [
	        "employee-1",
	        "employee-2",
	        "employee-9",
	        "employee-10"
	      ]
	    },
	    "column-2": {
	      id: "column-2",
	      title: "Bekkdalen",
	      employeeIds: [
	        "employee-3",
	        "employee-4",
	        "employee-11",
	        "employee-12"
	      ]
	    },
	    "column-3": {
	      id: "column-3",
	      title: "Steinbruddet",
	      employeeIds: [
	        "employee-5",
	        "employee-6",
	        "employee-13",
	        "employee-14"
	      ]
	    },
	    "column-4": {
	      id: "column-4",
	      title: "Gårdsbruket",
	      employeeIds: [
	        "employee-7",
	        "employee-8",
	        "employee-15",
	        "employee-16"
	      ]
	    }
  	},

    // facilitate reordering
    columnOrder: ["column-1", "column-2", "column-3", "column-4"],
}

export default initialData;
