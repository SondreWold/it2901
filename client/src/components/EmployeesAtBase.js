import React, {Component} from "react";
import MaterialIcon from "material-icons-react";

class EmployeesAtBase extends Component {
  render(){
    return (
      <div>
        <div className="peopleAtBase">
        <MaterialIcon icon="people" color="black"/>
        {" " + this.props.baseEmployees[0] -
          this.props.baseEmployees[1] +
          "/" +
           this.props.baseEmployees[0] + " "}
           Voskne tilstede
        </div>
        <div>
        <MaterialIcon icon="people"/>
           {" " + this.props.baseEmployees[1] + " "}
           Manglende ressurser
        </div>
      </div>
    )
  }
}

export default EmployeesAtBase;
