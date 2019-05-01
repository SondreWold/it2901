import React, { Component } from "react";
import "./Navigation.css";
import Colors from "../../constants/Colors"
import { FaBars } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { MdHome, MdSettings } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { NavLink } from "react-router-dom";

class NavBar extends Component {
  constructor() {
    super();

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  // opens and closes the navbar in mobile devices
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const className = this.state.isOpen ? "NavbarToggleShow" : "NavbarItems";
    return (
      <div>
        <h3 className="NavToggle">
          <FaBars className="NavToggle" color={Colors.NavbarColors.navbar} onClick={this.toggle} size={28} />
        </h3>
        <div className="Navbar">
          <nav className={className}>
          	<NavLink
                className="NavbarLink"
                exact
                to="/"
                onClick={this.toggle}
            >
	            <div className="NavButtons">
	             	  <MdHome size={24} />
	                <p>Hjem</p>
	            </div>
            </NavLink>
            
            <NavLink
              className="NavbarLink"
              exact
              to="/employees"
              onClick={this.toggle}
            >
              <div className="NavButtons">
                <FaUserFriends size={24} />
                <p>Ansatte</p>
            	</div>
            </NavLink>
            
            <NavLink
              className="NavbarLink"
              exact
              to="/stats"
              onClick={this.toggle}
            >
              <div className="NavButtons">
                <IoIosStats size={24} />
                <p>Statistikk</p>
            	</div>
					  </NavLink>
            
            <NavLink
              className="NavbarLink"
              exact
              to="/settings"
              onClick={this.toggle}
            >
            	<div className="NavButtons">
                <MdSettings size={24} />
                <p>Innstillinger</p>
            	</div>
          	</NavLink>
          </nav>
        </div>
      </div>
    );
  }
}

export default NavBar;
