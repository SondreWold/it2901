import React from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { deleteEmployeeFromDb } from "../../actions/deleteEmployeeAction";
import {FaTrash} from "react-icons/fa";

class DeleteEmployee extends React.Component {
  render() {
    return (
      <div>
        <Button
          onClick={() =>
            this.props.deleteEmployee(this.props.selectedEmployee.id)
          }
          style={style.deleteButton}
          className="deleteButton"
          color="secondary"
        >
          <FaTrash className="deleteIcon"/>
          Slett ansatt
        </Button>
      </div>
    );
  }
}

const style = {
  deleteButton: {
    maxWidth: "200px",
    minWidth:"150px",
    margin: "20px auto",
    border: "1px solid #C6C6CC",
  }
};

const mapDispatchToProps = dispatch => {
  return {
    deleteEmployee: id => dispatch(deleteEmployeeFromDb(id))
  };
};

const mapStateToProps = state => ({
  selectedEmployee: state.employeeList.selectedEmployee
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteEmployee);
