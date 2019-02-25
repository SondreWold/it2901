import React from "react";
import DateSelectorComponent from "./DateSelectorComponent";
import DateHeaderComponent from "./DateHeaderComponent";

class DateComponent extends React.Component {
  componentDidMount() {
    let date = new Date();
    this.props.changeDate(date);
  }

  render() {
    return (
      <div style={dateComponents}>
        <DateHeaderComponent date={this.props.date} />
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
  marginTop: 150
};
