import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { InputField } from "./SearchBar/InputField";
import AddEmployee from "./AddEmployee";
import Colors from "../../constants/Colors";
import "./EmployeeList.css";
import { FaFileExcel } from "react-icons/fa";

class EmployeeList extends React.Component {
  state = {
    selectedIndex: 0
  };

  handleClick(employee) {
    console.log(employee);
    this.setState({ selectedIndex: employee.id });
    this.props.updateSelectedEmployee(employee);
  }

  render() {
    /*
       - Renders a ListItem pr employee
        - If employee.position = 1 (not a temp worker), asign one colour, else => asign the other
        - If employee is selected, asign "selected colour" and set currentSelectedIndex to the id of that employee
      */
    return (
      <div>
        <h2 className="employeesHeadline">Ansatte </h2>
        <div className="employeeListTop">
          <InputField getSearchEmployees={this.props.getSearchEmployees} />
          <AddEmployee
            showEdit={false}
            first_name={""}
            last_name={""}
            base_id={"1"}
            position={"2"}
            empId={null}
          />
        </div>
        <List style={style.list} component="nav">
          {this.props.employees.map(employee => (
            <ListItem
              style={
                employee.id === this.state.selectedIndex
                  ? style.listItemSelected
                  : employee.position === 1
                  ? style.listItemRegular
                  : style.listItemTemporary
              }
              button
              key={employee.id}
              onClick={() => this.handleClick(employee)}
            >
              <ListItemText
                primary={employee.first_name + " " + employee.last_name}
                secondary={"Klikk for mer informasjon"}
              />
            </ListItem>
          ))}
        </List>
        <div style={style.colorInfoComp}>
          <div style={style.infos}>
            <div style={style.detailsBoxRegular} />
            <p>Fast ansatt</p>
          </div>
          <div style={style.infos}>
            <div style={style.detailsBoxTemporary} />
            <p> Vikar </p>
          </div>
        </div>
      </div>
    );
  }
}

const style = {
  detailsBoxRegular: {
    width: "10px",
    height: "10px",
    marginRight: "4px",
    marginTop: "4px",
    backgroundColor: Colors.EmployeeColors.moveableEmployee
  },
  detailsBoxTemporary: {
    width: "10px",
    height: "10px",
    marginRight: "4px",
    marginTop: "4px",
    backgroundColor: Colors.EmployeeColors.tempEmployee
  },
  list: {
    width: "100%",
    border: "5px",
    maxHeight: "260px",
    overflow: "auto"
  },
  listItemRegular: {
    width: "99%",
    margin: "2px",
    backgroundColor: Colors.EmployeeColors.moveableEmployee,
    borderRadius: "10px"
  },
  listItemTemporary: {
    width: "99%",
    margin: "2px",
    backgroundColor: Colors.EmployeeColors.tempEmployee,
    borderRadius: "10px"
  },
  listItemSelected: {
    width: "99%",
    margin: "2px",
    backgroundColor: Colors.EmployeeColors.selectedEmployee,
    borderRadius: "10px"
  },
  colorInfoComp: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginRight: "25px"
  },
  infos: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};

export default EmployeeList;
