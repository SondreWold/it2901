import React from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { deleteEmployeeFromDb } from "../../actions/deleteEmployeeAction";

class DeleteEmployee extends React.Component {
  render() {
    return (
      <div>
        <Button
          onClick={() =>
            this.props.deleteEmployee(this.props.selectedEmployee.id)
          }
          style={style.deleteButton}
        >
          Slett ansatt
        </Button>
      </div>
    );
  }
}

const style = {
  deleteButton: {
    maxWidth: "200px",
    margin: "20px auto",
    backgroundColor: "red"
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
