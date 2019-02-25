import React from "react";
import DateSelectorComponent from "./DateSelectorComponent";

class DateComponent extends React.Component {
  componentDidMount() {
    console.log("\n\n\ndato:");
    let date = new Date();
    this.props.changeDate(date);
  }

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
