import React from "react";
import DatePicker from "react-date-picker";
import DateNavigation from "./DateNavigation";
var calendar2 = require("../../images/calendar2.svg");

class DateSelectorComponent extends React.Component {
  render() {
    let calendarIcon = <img style={calendar} src={calendar2} alt="calendar" />;

    return (
      <div style={datepicker}>
        <DatePicker
          onChange={this.props.changeDate}
          clearIcon={null}
          value={this.props.date}
          locale={"nb"}
          returnValue={"start"}
          showLeadingZeros={true}
          calendarIcon={calendarIcon}
          minDate={this.props.minDate}
        />
        <DateNavigation
          changeDate={this.props.changeDate}
          date={this.props.date}
        />
      </div>
    );
  }
}

export default DateSelectorComponent;

const calendar = {
  width: 20
};

const datepicker = {
  height: 28
};
