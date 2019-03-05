import React, { Component } from "react";
import { FaUserFriends } from 'react-icons/fa';
import "./TotalOverview.css";

class EmployeesPresent extends Component{
  render(){
    return(
      <div className="totalEmployees">
        <FaUserFriends color="black" size="30px"/>
        <div className="totalHolder">
          <p className="totalText">
            {this.props.totalEmployees -
            this.props.totalAbsentEmployees +
            "/" +
            this.props.totalEmployees}
          </p>
          <p className="infoText">
            Voksne tilstede
          </p>
        </div>
      </div>
    );
  }
}

export default EmployeesPresent;