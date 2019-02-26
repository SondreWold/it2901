import React from "react";
import DateSelectorComponent from "./DateSelectorComponent";
import DateHeaderComponent from "./DateHeaderComponent";
import "./date.css";

class DateComponent extends React.Component {
  componentDidMount() {
    let date = new Date();
    this.props.changeDate(date);
  }

  render() {
    return (
      <div className="dateComponents">
        <DateHeaderComponent className="dateHeader" date={this.props.date} />
        <DateSelectorComponent
          className="dateSelector"
          date={this.props.date}
          changeDate={this.props.changeDate}
        />
      </div>
    );
  }
}

export default DateComponent;
