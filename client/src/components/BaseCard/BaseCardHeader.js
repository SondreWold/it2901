import React from "react";
import "./BaseCard.css";

class BaseCardHeader extends React.Component {
  render() {
    return (
    <div className="basecardHeader">
      <b> {this.props.baseName} </b>
    </div>
    )
  }
}

export default BaseCardHeader;
