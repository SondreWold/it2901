import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Colors from "../../constants/Colors";
import "./EmployeeDetails.css";

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
        <h3>Fravær </h3>
        <List style={style.list} className="absenceList" component="nav">
          {this.props.absence
            ? this.props.absence.map(absence => (
                <ListItem key={absence.date} style={style.listItem}>
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
    margin: "auto"
  },
  listItem: {
    width: "99%",
    margin: "2px",
    border: "1px solid",
    borderColor: Colors.EmployeeColors.borderColor,
    borderRadius: "10px",
    padding: "10px",
    textAlign: "center"
  }
};

export default EmployeeAbsenceList;
