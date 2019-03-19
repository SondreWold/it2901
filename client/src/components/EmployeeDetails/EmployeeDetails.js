import React from "react";
import "./EmployeeDetails.css";

class EmployeeDetails extends React.Component {

  componentDidMount(){
    this.props.getSelectedBase(this.props.selectedEmployee.base_id);
  }

  componentDidUpdate(prevProps){
    if(prevProps.selectedEmployee !== this.props.selectedEmployee)
    this.props.getSelectedBase(this.props.selectedEmployee.base_id);
  }

  render() {
    return (
      <div className="detailsInfoContainer">
        <h2 className="employeesHeadline"> 
          {this.props.selectedEmployee.first_name +
            " " +
            this.props.selectedEmployee.last_name}
        </h2>
        <p>
          {this.props.selectedEmployee.position === 1 ? "Fast ansatt på " + this.props.selectedBase : "Vikar"}
        </p>
      </div>
    );
  }
}

export default EmployeeDetails;
