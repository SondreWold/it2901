import React from "react";
import DateSelectorComponent from "./DateSelectorComponent";

class DateComponent extends React.Component {
  render() {
    return (
      <div style={dateComponents}>
        <DateSelectorComponent
          date={this.props.date}
          changeDate={this.props.changeDate}
        />
      </div>
    );
  }
}

export default DateComponent;

const dateComponents = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  marginTop: 70
};
