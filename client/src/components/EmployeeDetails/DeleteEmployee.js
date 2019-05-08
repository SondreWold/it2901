import React from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { deleteEmployeeFromDb } from "../../actions/contentActions/contentEmployeeActions";
import { updateSelectedEmployee } from "../../actions/EmployeeListActions/EmployeeListActions";
import { FaTrash } from "react-icons/fa";
import Alert from "react-s-alert";
import moment from "moment";
import Colors from "../../constants/Colors";

class DeleteEmployee extends React.Component {

  handleClick = () => {
    this.props.deleteEmployee(
    	this.props.selectedEmployee.id,
    	this.props.listOfEmployees.filter(
    		e => e.id !== this.props.selectedEmployee.id
    		)
  	);
    Alert.error("Ansatt slettet", {
      position: "bottom-right",
      effect: "jelly",
      timeout: 3000
    });
  };

  render() {
    return (
      <div>
        <Button
          onClick={this.handleClick}
          style={style.deleteButton}
          className="deleteButton"
        >
          <FaTrash className="deleteIcon" />
          Slett ansatt
        </Button>
      </div>
    );
  }
}

const style = {
  deleteButton: {
    maxWidth: "200px",
    minWidth: "150px",
    margin: "20px auto",
    border: "1px solid",
    borderColor: Colors.EmployeeColors.selectedEmployee,
    color: Colors.EmployeeColors.selectedEmployee
  }
};

const mapDispatchToProps = dispatch => {
  return {
    deleteEmployee: (id, employees) => dispatch(deleteEmployeeFromDb(id, employees))
  };
};

const mapStateToProps = state => ({
  selectedEmployee: state.employeeList.selectedEmployee,
  listOfEmployees: state.contentEmployee.searchData,
  date: state.date.selectedDate
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteEmployee);
