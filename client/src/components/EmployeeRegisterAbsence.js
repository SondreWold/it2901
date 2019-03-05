import React from "react";
import { connect } from "react-redux";
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
  	console.log(event.target)
    this.setState({from: event.target.value});
  }

  handleChangeTo(event) {
  	console.log(event.target)
    this.setState({to: event.target.value});
  }

  handleSubmit(event) {
    console.log('Submitted:', this.props.selectedEmployee.first_name + " " + this.props.selectedEmployee.last_name,
     "\n", this.state.from, "\n", this.state.to);
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
  return {};
};

const mapStateToProps = state => ({
  selectedEmployee: state.employeeList.selectedEmployee
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeRegisterAbsence);
