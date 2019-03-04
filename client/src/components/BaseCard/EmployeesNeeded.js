import React, {Component} from "react";

// the proposed number of employees / children
const FACTOR =  0.160;

class EmployeesNeeded extends Component {
	
  render(){

  	const employeesPresent = this.props.baseEmployees.length
  	const childrenPresent = this.props.totalChildren - this.props.absent
  	const needed = employeesPresent - Math.round(childrenPresent * FACTOR);

    return (
      <div>
  			<p> 
  				{needed ===  0
  					? ""
  					: needed > 0
	  				? "Forslag: flytt " + needed + " herfra" 
	  				: "Forslag: hent inn " + (-1)*needed + " til"
	  			}
				</p> 
      </div>
    )
  }
}

export default EmployeesNeeded;