import React, { Component } from "react";
import MaterialIcon from "material-icons-react";

class ChildrenPresent extends Component {
  render() {
    console.log(this.props.absentChildren);
    return (
      <div>
        {this.props.base + ": "}
        <MaterialIcon icon="child_care" />
        {this.props.totalChildren -
          this.props.absent +
          "/" +
          this.props.totalChildren}
      </div>
    );
  }
}

export default ChildrenPresent;
