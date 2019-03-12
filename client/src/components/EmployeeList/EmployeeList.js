import React from "react";
import { connect } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { updateSelectedEmployee } from "../../actions/EmployeeListActions/EmployeeListActions";
import { InputField } from "./SearchBar/InputField";
import { getEmployees } from "../../actions/contentActions/contentEmployeeActions";

class EmployeeList extends React.Component {
  state = {
    selectedIndex: 0
  };

  handleClick(employee) {
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
        <h1>Ansatte </h1>
        <InputField getEmployees={this.props.getEmployees} />
        <List style={style.list} component="nav">
          {this.props.employees.map(employee => (
            <ListItem
              style={
                employee.id === this.state.selectedIndex
                  ? style.listItemSelected
                  : employee.position === "1"
                  ? style.listItemRegular
                  : style.listItemTemporary
              }
              button
              key={employee.id}
              onClick={() => this.handleClick(employee)}
            >
              <ListItemText
                primary={employee.first_name + " " + employee.last_name}
              />
            </ListItem>
          ))}
        </List>
        <div>
          <List>
            <ListItem>
              <div style={style.detailsBoxRegular} />
              <ListItemText primary={"Fast ansatt"} />
            </ListItem>
            <ListItem>
              <div style={style.detailsBoxTemporary} />
              <ListItemText primary={"Vikar"} />
            </ListItem>
          </List>
        </div>
      </div>
    );
  }
}

const style = {
  detailsBoxRegular: {
    width: "10px",
    height: "10px",
    backgroundColor: "#43a047"
  },
  detailsBoxTemporary: {
    width: "10px",
    height: "10px",
    backgroundColor: "#fb8c00"
  },
  list: {
    width: "100%",
    border: "5px",
    maxHeight: "300px",
    overflow: "auto"
  },
  listItemRegular: {
    margin: "2px",
    backgroundColor: "#43a047"
  },
  listItemTemporary: {
    margin: "2px",
    backgroundColor: "#fb8c00"
  },
  listItemSelected: {
    margin: "2px",
    backgroundColor: "#0091ea"
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateSelectedEmployee: employee =>
      dispatch(updateSelectedEmployee(employee)),
    getEmployees: name => dispatch(getEmployees(name))
  };
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeList);
