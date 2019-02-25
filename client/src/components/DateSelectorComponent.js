import React from "react";
import DatePicker from "react-date-picker";
var calendar2 = require("./../images/calendar2.svg");

class DateSelectorComponent extends React.Component {
  render() {
    let calendarIcon = <img style={calendar} src={calendar2} alt="calendar" />;

    return (
      <div style={datepicker}>
        <div style={datepickerContainer}>
          <DatePicker
            style={whop}
            onChange={this.props.changeDate}
            clearIcon={null}
            returnValue={"start"}
            value={this.props.date.date}
            locale={"nb"}
            calendarIcon={calendarIcon}
          />
        </div>
      </div>
    );
  }
}

export default DateSelectorComponent;

const calendar = {
  width: 20
};

const whop = {
  borderRadius: 3
};

const datepicker = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  height: 28
};

const datepickerContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "flex-start",
  margin: 10,
  padding: 10
};
