import React, { Component } from "react";
import { FaChild } from "react-icons/fa";
import "./TotalOverview.css";

class ChildrenPresent extends Component {
  render() {
    return (
      <div className="totalChildren">
        <FaChild size="30px" />
        <div className="totalHolder">
          <p className="totalText">
            {this.props.totalChildren -
              this.props.totalAbsentChildren +
              "/" +
              this.props.totalChildren}
          </p>
          <p className="infoText">Barn tilstede</p>
        </div>
      </div>
    );
  }
}

export default ChildrenPresent;
