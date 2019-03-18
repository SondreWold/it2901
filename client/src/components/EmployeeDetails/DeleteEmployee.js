import React from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { deleteEmployeeFromDb } from "../../actions/deleteEmployeeAction";
import { FaTrash } from "react-icons/fa";
import Alert from "react-s-alert";

import moment from "moment";

class DeleteEmployee extends React.Component {
  handleClick = () => {
    this.props.deleteEmployee(
      this.props.selectedEmployee.id,
      moment(this.props.date).format("YYYY-MM-DD")
    );
    Alert.error("Ansatt slettet", {
      position: "bottom-right"
    });
  };

  render() {
    return (
      <div>
        <Button
          onClick={this.handleClick}
          style={style.deleteButton}
          className="deleteButton"
          color="secondary"
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
    border: "1px solid #C6C6CC"
  }
};

const mapDispatchToProps = dispatch => {
  return {
    deleteEmployee: (id, date) => dispatch(deleteEmployeeFromDb(id, date))
  };
};

const mapStateToProps = state => ({
  selectedEmployee: state.employeeList.selectedEmployee,
  date: state.date.selectedDate
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteEmployee);
