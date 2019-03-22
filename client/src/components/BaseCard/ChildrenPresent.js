import React, { Component } from "react";
import { FaChild } from "react-icons/fa";
import "./BaseCard.css";

class ChildrenPresent extends Component {
  render() {
    return (
      <div className="childrenAtBaseHolder">
        <div className="childrenPresent">
          {/*this.props.base + ": "*/}
          <FaChild className="childPresentIcon" size="20px" />
          {this.props.totalChildren -
            this.props.absent +
            "/" +
            this.props.totalChildren}
        </div>
        <p className="childrenText">Barn tilstede</p>
      </div>
    );
  }
}

export default ChildrenPresent;
