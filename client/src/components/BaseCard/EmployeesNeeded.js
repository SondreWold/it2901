import React, {Component} from "react";
import "./BaseCard.css";

class EmployeesNeeded extends Component {
	
  render(){


    return (
      <div>
  			<i className="employeesNeeded"> 
  				{this.props.neededEmployees ===  0
  					? "Pris herren"
  					: this.props.neededEmployees > 0
	  				? "Forslag: flytt " + this.props.neededEmployees + " herfra" 
	  				: "Forslag: hent inn " + (-1)*this.props.neededEmployees + " til"
	  			}
				</i> 
      </div>
    )
  }
}

export default EmployeesNeeded;