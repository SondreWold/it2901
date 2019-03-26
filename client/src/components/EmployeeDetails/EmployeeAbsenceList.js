import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Colors from "../../constants/Colors";

class EmployeeAbsenceList extends Component {
  componentDidMount() {
    this.props.getAbsence(this.props.selectedEmployee.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedEmployee !== this.props.selectedEmployee) {
      this.props.getAbsence(this.props.selectedEmployee.id);
    }
  }
  render() {
    return (
      <div>
        <h3>Tidligere fravær: </h3>
        <List style={style.list} component="nav">
          {this.props.absence
            ? this.props.absence.map(absence => (
                <ListItem style={style.listItem}>
                  <ListItemText primary={absence.date.split("T")[0]} />
                </ListItem>
              ))
            : ""}
        </List>
      </div>
    );
  }
}

const style = {
  list: {
    width: "100%",
    border: "5px",
    minHeight: "150px",
    maxHeight: "200px",
    overflow: "auto"
  },
  listItem: {
    width: "99%",
    margin: "2px",
    border: "1px solid",
    borderColor: Colors.EmployeeColors.moveableEmployee,
    borderRadius: "10px",
    padding: "10px"
  }
};

export default EmployeeAbsenceList;
