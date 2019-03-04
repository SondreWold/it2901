import React, { Component } from "react";
import moment from "moment";
import BaseCardList from "./BaseCardList";
import BaseCardHeader from "./BaseCardHeader";
import ChildrenPresent from "./ChildrenPresent";
import ChildrenAbsentIncDec from "./ChildrenAbsentIncDec";
import EmployeesAtBase from "./EmployeesAtBase";
import EmployeesNeeded from "./EmployeesNeeded";

class BaseCard extends Component {
  render() {
    return (
      <div style={Container}>
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
        	absent={this.props.absence.children}
        	totalChildren={this.props.absence.total_children}
        	baseEmployees={this.props.dragEmployees}
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
  minHeight: "300px"
};
