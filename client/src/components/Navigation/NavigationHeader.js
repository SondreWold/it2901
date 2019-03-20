import React, { Component } from "react";
import "./Navigation.css";
import { NavLink } from "react-router-dom";

class NavigationHeader extends Component {
  render() {
    return (
      <div className="NavigationHeader">
        <NavLink className="NavbarLink" exact to="/">
          {this.props.pageHeader}
        </NavLink>
      </div>
    );
  }
}

export default NavigationHeader;
