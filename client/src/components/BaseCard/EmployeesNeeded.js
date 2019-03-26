import React, { Component } from "react";
import moment from "moment";
import "./BaseCard.css";

class EmployeesNeeded extends Component {

	componentDidUpdate(prevProps){
		if (prevProps !== this.props){
			this.props.updateRatio(moment(this.props.date).format("YYYY-MM-DD"), this.props.baseId, this.props.ratio);	
		}
	}

  render() {
    return (
      <div>
        <i className="employeesNeeded">
          {this.props.ratio === 0
            ? "OK"
            : this.props.ratio >= 0
            ? "Overbemanning: " + this.props.ratio
            : "Underbemanning: " + -1 * this.props.ratio}
        </i>
      </div>
    );
  }
}

export default EmployeesNeeded;