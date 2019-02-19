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

export default initialData;
