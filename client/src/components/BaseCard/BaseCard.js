import React, { Component } from "react";
import BaseCardHeader from "./BaseCardHeader";

class BaseCard extends Component {
  render() {
    return (
      <div className="baseCard">
        <BaseCardHeader baseName={this.props.title} />
        <div
          style={{
            margin: "auto",
            borderRadius: "2px",
            backgroundColor: this.props.color,
            width: "100%",
            height: "10px"
          }}
        />
        {this.props.children}
      </div>
    );
  }
}

export default BaseCard;
