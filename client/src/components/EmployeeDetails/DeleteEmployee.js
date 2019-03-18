import React from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { deleteEmployeeFromDb } from "../../actions/deleteEmployeeAction";
import {FaTrash} from "react-icons/fa";
import Alert from 'react-s-alert';



class DeleteEmployee extends React.Component {

	handleClick = () => {
		this.props.deleteEmployee(this.props.selectedEmployee.id)
		Alert.error('Ansatt slettet', {
      position: 'bottom-right',
      effect: 'jelly',
      timeout: 3000
    });

	}

  render() {
    return (
      <div>
        <Button
          onClick={this.handleClick}
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
