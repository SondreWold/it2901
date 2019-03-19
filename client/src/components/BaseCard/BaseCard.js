import React, { Component } from "react";
import moment from "moment";
import BaseCardList from "./BaseCardList";
import BaseCardHeader from "./BaseCardHeader";
import ChildrenPresent from "./ChildrenPresent";
import ChildrenAbsentIncDec from "./ChildrenAbsentIncDec";
import EmployeesAtBase from "./EmployeesAtBase";
import EmployeesNeeded from "./EmployeesNeeded";
import "./BaseCard.css";
import Adder from "./Adder";
import Colors from "../../constants/Colors";


class BaseCard extends Component {
  constructor(props) {
    super(props);
    this.state = { icon: true };
  }

  calculateEmployeesAtBase = () => {
  	return this.props.base.total_children * this.props.base.ratio;
  };

  colorRendering = value => {
    let color = Colors.BaseColors.ok;
    if (value >= 0) {
      color = Colors.BaseColors.good;
    } else if (value < -1) {
      color = Colors.BaseColors.bad;
    }
    return color;
  };

  render() {
    const employeesAtBase = this.calculateEmployeesAtBase();
    // calc of needed employees
    const employeesPresent = this.props.dragEmployees.length;
    const childrenPresent =
      this.props.absence.total_children - this.props.absence.children;

    const neededEmployees = Number((employeesPresent - childrenPresent * this.props.base.ratio).toFixed(2));
    const color = this.colorRendering(neededEmployees);

    return (
      <div className="baseCard" style={{ backgroundColor: color }}>
        <BaseCardHeader baseName={this.props.base.name} />
        <div className="childrenHolder">
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
        </div>
        <EmployeesAtBase
          baseEmployees={employeesAtBase}
          employeesPresent={employeesPresent}
          absentEmployees={this.props.absentEmployees}
          base={this.props.base}
          employees={this.props.employees}
          date={this.props.date}
        />
        <EmployeesNeeded neededEmployees={neededEmployees} />
        <BaseCardList
          key={this.props.dragBase.id}
          dragBase={this.props.dragBase}
          dragEmployees={this.props.dragEmployees}
        />
        <Adder
          freeTemps={this.props.freeTemps}
          base={this.props.base}
          addTempToBase={this.props.addTempToBase}
          date={moment(this.props.absence.date).format("YYYY-MM-DD")}
        />
      </div>
    );
  }
}

export default BaseCard;
