import React, {Component} from "react";
import MaterialIcon from "material-icons-react";

class EmployeesAtBase extends Component {
  render(){
    return (
      <div className="employeesAtBase">
        <MaterialIcon icon="people" color="black" />
        <p className="employeesAtBaseNumber">
          { this.props.baseEmployees[0] -
           this.props.baseEmployees[1] +
            "/" +
            this.props.baseEmployees[0]}
        </p>
      </div>
    )
  }
}

export default EmployeesAtBase;
