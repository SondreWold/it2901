import React, {Component} from 'react';
import './Navigation.css';
import { FaBars } from 'react-icons/fa';
import {IoIosStats} from 'react-icons/io';
import {MdHome,  MdSettings} from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa'
import {NavLink} from 'react-router-dom';


class NavBar extends Component {
 
    constructor() {
        super();
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }

    //Opens and closes the navbar in mobile devices
    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

    render() {
        const className = this.state.isOpen ? "NavbarToggleShow" : "NavbarItems";
        return (
            <div>
                <h3 className="NavToggle"><FaBars className="NavToggle" onClick={this.toggle} size={28} /></h3>
                <div className="Navbar">
                    <nav className={className}>
                        <div className="NavButtons">
                            <NavLink className="NavbarLink" exact to="/" onClick={this.toggle}>
                                <MdHome size={30}/>
                                <p>Hjem</p>
                            </NavLink>
                        </div>
                        <div className="NavButtons">
                            <NavLink className="NavbarLink" exact to="/employees" onClick={this.toggle}>
                                <FaUserFriends size={30}/> 
                                <p>Ansatte</p>
                            </NavLink>
                        </div>
                        <div className="NavButtons">
                            <NavLink className="NavbarLink" exact to="/stats" onClick={this.toggle}>
                                <IoIosStats size={30}/>
                                <p>Statistikk</p>
                            </NavLink>
                        </div>
                        <div className="NavButtons">
                            <NavLink className="NavbarLink" exact to="/settings" onClick={this.toggle}>
                                <MdSettings size={30}/>
                                <p>Innstillinger</p>
                            </NavLink>
                        </div>
                    </nav>
                </div>
            </div>
         ) 
        }
    }

  export default NavBar;