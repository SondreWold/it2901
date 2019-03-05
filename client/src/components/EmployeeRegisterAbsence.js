import React from "react";
import { connect } from "react-redux";
import { insertAbsentEmployee } from "../actions/insertAbsentEmployeeAction";
import moment from "moment";
import DatePicker from "react-date-picker";
const calendar2 = require("../images/calendar2.svg");

class EmployeeRegisterAbsence extends React.Component {

	constructor(props) {
    super(props);
    const calendarIcon = <img style={{width: 20}} src={calendar2} alt="calendar" />;
    // initial state is from today until tomorrow
	  const now = new Date()
    this.state = {
      from: moment(now).format("YYYY-MM-DD"),
      to: moment(now).add(1, 'days').format("YYYY-MM-DD")
    };

    this.handleChangeFrom = this.handleChangeFrom.bind(this);
    this.handleChangeTo = this.handleChangeTo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeFrom(event) {
    this.setState({from: event.target.value});
  }

  handleChangeTo(event) {
    this.setState({to: event.target.value});
  }

  handleSubmit(event) {
    // in case there is no selectedEmployee
    if (this.props.selectedEmployee) {
	    this.props.insertAbsentEmployee(this.props.selectedEmployee.id, this.state.to)
    }
    event.preventDefault();
  }

  render() {
    return (
      <div style={style}>
        <h1>

          {this.props.selectedEmployee.first_name +
            " " +
            this.props.selectedEmployee.last_name}
        </h1>
        <h3>
        	{"This is inside EmployeeRegisterAbsence"}
        </h3>
        <form onSubmit={this.handleSubmit}>
          <input type="date" name="from" value={this.state.from} onChange={this.handleChangeFrom} />
          <input type="date" name="to" value={this.state.to} onChange={this.handleChangeTo} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const style = {
  
};

const mapDispatchToProps = dispatch => {
  return {
  	insertAbsentEmployee: (empId, date) => dispatch(insertAbsentEmployee(empId, date))
  };
};

const mapStateToProps = state => ({
  selectedEmployee: state.employeeList.selectedEmployee
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeRegisterAbsence);