import React from "react";

class BaseCardHeader extends React.Component {
  render() {
    return <div>{this.props.baseName}</div>;
  }
}

export default BaseCardHeader;
