import React, {Component} from "react";
import MaterialIcon from "material-icons-react";

class EmployeesAtBase extends Component {
  render(){
    return (
      <div>
      <MaterialIcon icon="people" color="black" />
      { this.props.baseEmployees[0] -
        this.props.baseEmployees[1] +
        "/" +
         this.props.baseEmployees[0]}
      </div>
    )
  }
}

export default EmployeesAtBase;
