import React, { Component } from "react";
import "./Navigation.css";

class NavigationHeader extends Component {
  render() {
    return <div className="NavigationHeader"> {this.props.pageHeader} </div>;
  }
}

export default NavigationHeader;
