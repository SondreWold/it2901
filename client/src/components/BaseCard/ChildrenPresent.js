import React, { Component } from "react";
import { FaChild } from 'react-icons/fa';
import "./BaseCard.css";

class ChildrenPresent extends Component {
  render() {
    return (
      <div className="childrenPresent">
        {/*this.props.base + ": "*/}
        <FaChild className="childPresentIcon" />
        {this.props.totalChildren -
          this.props.absent +
          "/" +
          this.props.totalChildren}
      </div>
    );
  }
}

export default ChildrenPresent;
