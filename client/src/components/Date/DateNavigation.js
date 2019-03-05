import React from "react";
import { MdArrowBack, MdArrowForward, MdToday } from "react-icons/md";
import moment from "moment";

class DateNavigation extends React.Component {
  render() {
    var date = this.props.date;
    let today = new Date();
    var yesterday;
    moment(date).format("YYYY-MM-DD") === moment(this.props.minDate).format("YYYY-MM-DD")
    ? yesterday = date
    : yesterday = new Date(date.getTime() - 24 * 60 * 60 * 1000);
    var tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000);

    return (
      <div className="dateNavigation">
        <span className="dateNavigationIcon">
          <MdArrowBack
            onClick={() => this.props.changeDate(yesterday)}
            className="dateIcon"
          />
        </span>
        <span className="dateNavigationIcon">
          <MdToday
            onClick={() => this.props.changeDate(today)}
            className="dateIcon"
          />
        </span>
        <span className="dateNavigationIcon">
          <MdArrowForward
            onClick={() => this.props.changeDate(tomorrow)}
            className="dateIcon"
          />
        </span>
      </div>
    );
  }
}

export default DateNavigation;
