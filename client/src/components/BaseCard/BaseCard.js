import React, { Component } from "react";
import BaseCardHeader from "./BaseCardHeader";
import { Divider } from "@material-ui/core";

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
        <Divider />
      </div>
    );
  }
}

export default BaseCard;
