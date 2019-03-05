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

    // format minDate from string to Date object
		const year = this.props.minDate.substring(6, 10);
		const month = this.props.minDate.substring(0, 2) - 1;
		const day = this.props.minDate.substring(3, 5);
		const minDateObj = new Date(year, month, day);

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
    this.setState({from: date});
  }

  handleChangeTo(date) {
    this.setState({to: date});
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
        <h3>
        	{"This is inside EmployeeRegisterAbsence"}
        </h3>
        <form onSubmit={this.handleSubmit}>
          <DatePicker
	          onChange={this.handleChangeFrom}
	          clearIcon={null}
	          value={this.state.from}
	          locale={"nb"}
	          returnValue={"start"}
	          showLeadingZeros={true}
	          calendarIcon={this.calendarIcon}
	          minDate={this.minDateObj}
        	/>
          <DatePicker
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