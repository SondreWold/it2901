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
            className="material-icons"
            onClick={() => this.props.changeDate(yesterday)}
            size="20px"
          />
        </span>
        <span className="dateNavigationIcon">
          <MdToday
            className="material-icons"
            onClick={() => this.props.changeDate(today)}
            size="20px"
          />
        </span>
        <span className="dateNavigationIcon">
          <MdArrowForward
            className="material-icons"
            onClick={() => this.props.changeDate(tomorrow)}
            size="20px"
          />
        </span>
      </div>
    );
  }
}

export default DateNavigation;
