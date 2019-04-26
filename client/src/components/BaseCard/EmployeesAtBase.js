import React, { Component } from "react";
import { FaUser, FaRegUser } from "react-icons/fa";
import moment from "moment";
import Colors from "../../constants/Colors";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Button } from "@material-ui/core";

class EmployeesAtBase extends Component {
	constructor(props) {
    super(props);
    this.state = { open: false };
  }

  calcMissingResources = (absentEmployees, base, employees, date) => {
    const missingResources = absentEmployees
      .map(ae =>
        Object.assign(ae, employees.find(e => e.id === ae.employee_id))
      )
      .filter(e => e.base_id === base.id)
      .filter(
        e =>
          moment(e.date).format("YYYY-MM-DD") ===
          moment(date).format("YYYY-MM-DD")
      );

    return missingResources;
  };
  open = () => {
    this.setState({ open: true });
  };

  close = () => {
    this.setState({ open: false });
  };

  render() {
    const missingResources = this.calcMissingResources(
      this.props.absentEmployees,
      this.props.base,
      this.props.employees,
      this.props.date
    );
    return (
      <div className="employeesHolder">
        <div className="employeeCountHolder">
          <div className="employeesAtBase">
            <FaUser size="15px" />
            <p className="employeesAtBaseNumber">
              {" " +
                this.props.employeesPresent +
                "/" +
                this.props.baseEmployees +
                " "}
            </p>
          </div>
          <p className="employeesText">
            Voksne <br /> tilstede
          </p>
        </div>
        <div onClick={this.open} className="employeeAbsentCountHolder">
          <div className="employeesAbsentAtBase">
            <FaRegUser size="15px" />
            <p className="employeesAtBaseNumber">
              {" " + missingResources.length + " "}
            </p>
          </div>
          <p className="employeesText">
            Fraværende <br /> voksne
          </p>
        </div>
				<Dialog
          open={this.state.open}
          onEscapeKeyDown={this.close}
          onBackdropClick={this.close}
        >
          <DialogTitle> Fraværende ansatte på {this.props.base.name} </DialogTitle>
          <DialogContent>
            <div style={style.window}>
              <List style={style.list} component="nav">
                {
              	missingResources.length > 0
                ?	(missingResources.map(employee => (
                  <ListItem
                    style={style.listItemRegular}
                    key={employee.employee_id}
                  >
                    <ListItemText
                      primary={employee.first_name + " " + employee.last_name}
                    />
                  </ListItem>)))
                : (<p> Det er ingen fraværende her i dag </p>)
                }
              </List>
              <Button
                onClick={this.close}
                style={style.closeButton}
                color="primary">
                  Lukk
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const style = {
  window: {
    display: "flex",
    flexDirection: "column",
    padding: "5%", 
    margin: "auto"
  },
  list: {
    width: "100%",
    border: "5px",
    maxHeight: "300px",
    overflow: "auto",
    margin: "auto"
  },
  listItemRegular: {
    margin: "auto",
    borderRadius: "10px",
    marginBottom: "2px",
    backgroundColor: Colors.EmployeeColors.moveableEmployee
  }, 
  closeButton : {
    maxWidth: "100px",
    minWidth: "100px",
    margin: "auto",
    border: "1px solid",
    borderColor: Colors.EmployeeColors.moveableEmployee,
    color: Colors.EmployeeColors.moveableEmployee
  }
};

export default EmployeesAtBase;
