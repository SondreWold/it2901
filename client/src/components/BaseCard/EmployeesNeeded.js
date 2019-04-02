import React, { Component } from "react";
import moment from "moment";
import "./BaseCard.css";

class EmployeesNeeded extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.props.updateRatio(
        moment(this.props.date).format("YYYY-MM-DD"),
        this.props.baseId,
        this.props.ratio
      );
    }
  }

  render() {
    return (
      <div>
        <i className="employeesNeeded">
          {this.props.ratio === 0
            ? "OK"
            : this.props.ratio >= 0
            ? "Overbemanning: "
            : "Underbemanning: "}

          <i
            style={{
              color: this.props.color,
              fontWeight: "bold"
            }}
          >
            {this.props.ratio >= 0 ? this.props.ratio : -1 * this.props.ratio}
          </i>
        </i>
      </div>
    );
  }
}
export default EmployeesNeeded;
