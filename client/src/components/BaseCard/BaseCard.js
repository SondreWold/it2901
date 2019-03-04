import React, { Component } from "react";
import moment from "moment";
import BaseCardList from "./BaseCardList";
import BaseCardHeader from "./BaseCardHeader";
import ChildrenPresent from "./ChildrenPresent";
import ChildrenAbsentIncDec from "./ChildrenAbsentIncDec";
import EmployeesAtBase from "./EmployeesAtBase";
import EmployeesNeeded from "./EmployeesNeeded";

// the proposed number of employees / children
const FACTOR =  0.160;

class BaseCard extends Component {

	colorRendering = (value) => {
		let color = "#FFFB94";
		if (value >= 0) {
			color = "#B2F1AF";
		} else if (value < -1) {
			color = "#FF8989";
		}
		return color;

	}

  render() {

  	// calc of needed employees
  	const employeesPresent = this.props.dragEmployees.length;
  	const childrenPresent = this.props.absence.total_children - this.props.absence.children;
  	const neededEmployees = employeesPresent - Math.round(childrenPresent * FACTOR);
  	const color = this.colorRendering(neededEmployees);

    return (
      <div style={Container, {backgroundColor: color}}>
        <BaseCardHeader baseName={this.props.base.name} />
        <ChildrenPresent
          base={this.props.absence.base_id}
          absent={this.props.absence.children}
          totalChildren={this.props.absence.total_children}
        />
        <ChildrenAbsentIncDec
          base={this.props.absence.base_id}
          absent={this.props.absence.children}
          date={moment(this.props.absence.date).format("YYYY-MM-DD")}
          totalChildren={this.props.absence.total_children}
          update={this.props.update}
        />
        <EmployeesAtBase baseEmployees={this.props.baseEmployees} />
        <EmployeesNeeded 
	      	neededEmployees={neededEmployees}
        />
        <BaseCardList
          key={this.props.dragBase.id}
          dragBase={this.props.dragBase}
          dragEmployees={this.props.dragEmployees}
        />
      </div>
    );
  }
}

export default BaseCard;

const Container = {
  border: "1px solid black",
  borderRadius: "5px",
  margin: "10px",
  minHeight: "300px",
};
