import React, { Component } from "react";

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
        <div onClick={this.decAbsence}>+</div>
        <div onClick={this.incAbsence}>-</div>
      </div>
    );
  }
}

export default ChildrenAbsentIncDec;
