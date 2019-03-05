import React, { Component } from "react";
import { FaRegPlusSquare, FaRegMinusSquare } from 'react-icons/fa';
import "./BaseCard.css";

class ChildrenAbsentIncDec extends Component {
  componentDidMount() {
  }

  decAbsence = () => {
    if (this.props.absent > 0) {
      this.props.update(
        this.props.absent - 1,
        this.props.base,
        this.props.date
      );
    }
  };

  incAbsence = () => {
    if (this.props.absent < this.props.totalChildren) {
      this.props.update(
        this.props.absent + 1,
        this.props.base,
        this.props.date
      );
    }
  };

  render() {
    return (
      <div>
        <div className="childAbsentButton" onClick={this.decAbsence}>
          <FaRegPlusSquare className="childAbsentIcon"/>
        </div>
        <div className="childAbsentButton" onClick={this.incAbsence}>
          <FaRegMinusSquare className="childAbsentIcon"/>
        </div>
      </div>
    );
  }
}

export default ChildrenAbsentIncDec;
