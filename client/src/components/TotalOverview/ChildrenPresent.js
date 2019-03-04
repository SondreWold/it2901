import React, { Component } from "react";
import {FaChild} from 'react-icons/fa';

class ChildrenPresent extends Component{

  render(){
    return(
      <div className="totalChildren">
        <FaChild/>
        {this.props.totalChildren -
          this.props.totalAbsentChildren +
          "/" +
          this.props.totalChildren + " Barn tilstede"}
      </div>
    );
  }
}

export default ChildrenPresent;
