import React from "react";
import DatePicker from "react-date-picker";
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
        />
      </div>
    );
  }
}

export default DateSelectorComponent;

const calendar = {
  width: 28,
  height: 28,
  marginRight: 10
};

const datepicker = {
  display: "flex",
  justifyContent: "space-around"
};
