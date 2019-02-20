import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import "moment/locale/en-ca";
import { changeDate } from "./../actions/dateAction";
import { connect } from "react-redux";
var calendar2 = require("./../images/calendar2.svg");

class DateSelectorComponent extends React.Component {
  render() {
    return (
      <div style={datepicker}>
        <img style={calendar} src={calendar2} alt="calendar" />
        <DayPickerInput
          value={this.props.selectedDate}
          onDayChange={this.props.changeDate("heihei")}
          dayPickerProps={{
            showWeekNumbers: true,
            todayButton: "Today"
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  date: state.date.selectedDate
});

const mapDispatchToProps = dispatch => {
  return {
    changeDate: () => dispatch({ type: changeDate() })
  };
};

export default connect(
  mapDispatchToProps,
  mapStateToProps
)(DateSelectorComponent);

const calendar = {
  width: 28,
  height: 28,
  marginRight: 10
};

const datepicker = {
  display: "flex",
  justifyContent: "space-around"
};
