import React from "react";
import DatePicker from "react-date-picker";
var calendar2 = require("./../images/calendar2.svg");

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
          calendarIcon={calendarIcon}
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
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  height: 28
};
