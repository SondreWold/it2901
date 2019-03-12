import React, { Component } from "react";
import { connect } from "react-redux";
import { insertNewEmployee } from "../actions/newEmployeeAction";

class AddNewEmployee extends Component {
  componentDidMount() {
    this.props.insertNewEmployee("Ingrid", "Larsen", 1, 1, 1);
  }

  render() {
    return (
      <div>
        <p>Heia</p>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    insertNewEmployee: (firstName, lastName, baseID, position, movable) =>
      dispatch(
        insertNewEmployee(firstName, lastName, baseID, position, movable)
      )
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AddNewEmployee);
