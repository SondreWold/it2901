import React, { Component } from "react";
import ChildrenPresent from "./ChildrenPresent";
import ChildrenAbsentIncDec from "./ChildrenAbsentIncDec";
class BaseCard extends Component {
  render() {
    return (
      <div className="childrenHolder">
        <ChildrenPresent
          base={this.props.base}
          absent={this.props.absent}
          totalChildren={this.props.total}
        />
        <ChildrenAbsentIncDec
          base={this.props.base}
          absent={this.props.absent}
          date={this.props.date}
          totalChildren={this.props.total}
          update={this.props.update}
        />
      </div>
    );
  }
}

export default BaseCard;
