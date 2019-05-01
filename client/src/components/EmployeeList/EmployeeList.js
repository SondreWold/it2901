import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { InputField } from "./SearchBar/InputField";
import AddEmployee from "./AddEmployee";
import Colors from "../../constants/Colors";
import "./EmployeeList.css";

class EmployeeList extends React.Component {
  updateSelectedEmployee(employee) {
    this.props.updateSelectedEmployee(employee);
  }

  componentDidUpdate() {
    // select the first employee by default if none are selected
    if (!this.props.selectedEmployee && this.props.employees.length > 0) {
      this.updateSelectedEmployee(this.props.employees[0]);
    }
  }

  render() {
    /*
      renders a ListItem pr employee
     	- if employee.position = 1 (not a temp worker), assign one colour, else => assign the other
      - if employee is selected, assign "selected colour" and set currentSelectedIndex to the id of that employee
      */
    return (
      <div className="employeeList">
        <h2 className="employeesHeadline">Ansatte </h2>
        <div className="employeeListTop">
          <InputField
            id="searchField"
            getSearchEmployees={this.props.getSearchEmployees}
          />
          <AddEmployee
            showEdit={false}
            first_name={""}
            last_name={""}
            base_id={
              this.props.bases.length > 0 ? String(this.props.bases[0].id) : "1"
            }
            position={"2"}
            bases={this.props.bases}
            empId={null}
          />
        </div>
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
        <List style={style.list} component="nav">
          {this.props.employees.length === 0 ? (
            "Fant ingen ansatte..."
          ) : (
            <div>
              {this.props.employees.map(employee => (
                <ListItem
                  style={
                    employee.id === this.props.selectedEmployee.id
                      ? style.listItemSelected
                      : employee.position === 1
                      ? style.listItemRegular
                      : style.listItemTemporary
                  }
                  button
                  key={employee.id}
                  onClick={() => this.updateSelectedEmployee(employee)}
                >
                  <ListItemText
                    id={"empText"}
                    primary={employee.first_name + " " + employee.last_name}
                  />
                </ListItem>
              ))}
            </div>
          )}
        </List>
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
    maxHeight: "300px",
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
