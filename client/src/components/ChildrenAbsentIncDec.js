import React, { Component } from "react";

class ChildrenAbsentIncDec extends Component {
  componentDidMount() {
    console.log("inc");
    console.log(this.props.absent);
    console.log(this.props.totalChildren);
    console.log(this.props.base);
    console.log(this.props.date);
  }

  decAbsence = () => {
    if (this.props.absent > 0) {
      this.props.update(this.props.absent - 1, this.props.base, "2019-02-19");
    }
  };

  incAbsence = () => {
    if (this.props.absent < this.props.totalChildren) {
      this.props.update(this.props.absent + 1, this.props.base, "2019-02-19");
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
