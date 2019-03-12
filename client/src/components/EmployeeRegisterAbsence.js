import React from "react";
import { connect } from "react-redux";
import { insertAbsentEmployee } from "../actions/insertAbsentEmployeeAction";
import moment from "moment";
import DatePicker from "react-date-picker";
import Button from '@material-ui/core/Button';

const calendar2 = require("../images/calendar2.svg");

class EmployeeRegisterAbsence extends React.Component {

	constructor(props) {
    super(props);
    this.calendarIcon = <img style={{width: 20}} src={calendar2} alt="calendar" />;

		// using tmp to avoid error when copying
	  const tmp = new Date()
    this.state = {
    	from: new Date(),
    	to: new Date(tmp.setDate(tmp.getDate() + 1))
    };

    this.handleChangeFrom = this.handleChangeFrom.bind(this);
    this.handleChangeTo = this.handleChangeTo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeFrom(date) {
  	date > this.state.to
  	? this.setState({from: date, to: date})
    : this.setState({from: date})
  }

  handleChangeTo(date) {
	 	this.state.from > date
		? this.setState({from: date, to: date})
	  : this.setState({from: date})
  }

  handleSubmit(event) {
    // in case there is no selectedEmployee
    if (this.props.selectedEmployee) {
    	const diff = this.diffDates(this.state.from, this.state.to)
	    diff.forEach( date => this.props.insertAbsentEmployee(this.props.selectedEmployee.id, date))
    }
    event.preventDefault();
  }

  diffDates(date1, date2) {
  	const a = moment(date1).format("YYYY-MM-DD");
  	const b = moment(date2).format("YYYY-MM-DD");
  	const m = moment(a);
  	const dates = []
  	for (m; m.diff(b, 'days') <= 0; m.add(1, 'days')) {
			  dates.push(m.format('YYYY-MM-DD'));
		}
		return dates
  }

  render() {
    return (
      <div style={style}>
      	<h3> Velg antall dager med fravær </h3>
        <form noValidate onSubmit={this.handleSubmit}>
          <DatePicker style={style.datePicker}
	          onChange={this.handleChangeFrom}
	          clearIcon={null}
	          value={this.state.from}
	          locale={"nb"}
	          returnValue={"start"}
	          showLeadingZeros={true}
	          calendarIcon={this.calendarIcon}
	          placeholderText={"Fra"}
	          minDate={this.minDateObj}
        	/>
          <DatePicker style={style.datePicker}
	          onChange={this.handleChangeTo}
	          clearIcon={null}
	          value={this.state.to}
	          locale={"nb"}
	          returnValue={"start"}
	          showLeadingZeros={true}
	          calendarIcon={this.calendarIcon}
	          minDate={this.state.from}
        	/>
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
  selectedEmployee: state.employeeList.selectedEmployee,
  minDate: state.date.minDate
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeRegisterAbsence);