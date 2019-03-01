import React, { Component } from "react";
import { FaChild } from 'react-icons/fa';

class ChildrenPresent extends Component {
  render() {
    return (
      <div>
        {this.props.base + ": "}
        <FaChild />
        {this.props.totalChildren -
          this.props.absent +
          "/" +
          this.props.totalChildren}
      </div>
    );
  }
}

export default ChildrenPresent;
