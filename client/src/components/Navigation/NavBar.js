import React, {Component} from 'react';
import './Navigation.css';
import { FaBars } from 'react-icons/fa';
import {IoIosStats} from 'react-icons/io';
import {MdHome, MdPeople, MdSettings} from 'react-icons/md';


class NavBar extends Component {
 
    constructor() {
        super();
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

      test() {
          alert("Tar i mot klikk. Skal rute til annen side?")
      }

    render() {
        const className = this.state.isOpen ? "NavbarToggleShow" : "NavbarItems";
        return (
            <div>
                <h3 className="NavToggle"><FaBars className="NavToggle" onClick={this.toggle} size={28} /></h3>
                <div className="Navbar">
                    <nav className={className}>
                        <div className="NavbarLink">
                            <MdHome size={30} onClick={this.test} />
                            <p>Hjem</p>
                        </div>
                        <div className="NavbarLink">
                            <MdPeople size={30} onClick={this.test}/> 
                            <p>Ansatte</p>
                        </div>
                        <div className="NavbarLink">
                            <IoIosStats size={30} onClick={this.test}/>
                            <p>Statistikk</p>
                        </div>
                        <div className="NavbarLink">
                            <MdSettings size={30} onClick={this.test}/>
                            <p>Innstillinger</p>
                        </div>
                    </nav>
                </div>
            </div>
         ) 
        }
    }

  export default NavBar;