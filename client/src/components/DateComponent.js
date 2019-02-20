import React from "react";
import DateHeaderComponent from "./DateHeaderComponent";
import DateSelectorComponent from "./DateSelectorComponent";

class DateComponent extends React.Component {
  render() {
    return (
      <div style={dateComponents}>
        <DateHeaderComponent />
        <DateSelectorComponent />
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
