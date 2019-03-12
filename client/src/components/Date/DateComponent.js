import React from "react";
import DateSelectorComponent from "./DateSelectorComponent";
import DateHeaderComponent from "./DateHeaderComponent";
import AddNewEmployee from "./../addNewEmployee";
import "./date.css";

class DateComponent extends React.Component {
  componentDidMount() {
    let date = new Date();
    this.props.changeDate(date);
  }

  render() {
    let year = this.props.minDate.substring(6, 10);
    let month = this.props.minDate.substring(0, 2) - 1;
    let day = this.props.minDate.substring(3, 5);
    let minDate = new Date(year, month, day);

    return (
      <div className="dateComponents">
        <AddNewEmployee />
        <DateHeaderComponent className="dateHeader" date={this.props.date} />
        <DateSelectorComponent
          className="dateSelector"
          date={this.props.date}
          minDate={minDate}
          changeDate={this.props.changeDate}
        />
      </div>
    );
  }
}

export default DateComponent;
