import React from "react";
import DatePicker from "react-date-picker";
import { changeDate } from "./../actions/dateAction";
import { connect } from "react-redux";
var calendar2 = require("./../images/calendar2.svg");

class DateSelectorComponent extends React.Component {
  render() {
    return (
      <div style={datepicker}>
        <img style={calendar} src={calendar2} alt="calendar" />
        <DatePicker
          onChange={this.props.changeDate}
          clearIcon={null}
          returnValue={"start"}
          value={this.props.date}
          locale={"nb"}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  date: state.date.selectedDate.date
});

const mapDispatchToProps = dispatch => {
  return {
    changeDate: date => dispatch(changeDate(date))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateSelectorComponent);

const calendar = {
  width: 28,
  height: 28,
  marginRight: 10
};

const datepicker = {
  display: "flex",
  justifyContent: "space-around",
  height: 28
};
