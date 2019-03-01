import React, { Component } from "react";
import MaterialIcon from "material-icons-react";

class ChildrenPresent extends Component{
  render(){
    return(
      <div className="totalChildren">
        <MaterialIcon icon="child_care" />
        {this.props.totalChildren -
          this.props.totalAbsentChildren +
          "/" +
          this.props.totalChildren + " Barn tilstede"}
      </div>
    );
  }
}

export default ChildrenPresent;
