import React from "react";
import { arrow_back, arrow_forward, today } from "react-icons/md";
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
          <i
            class="material-icons"
            onClick={() => this.props.changeDate(yesterday)}
          >
            arrow_back
          </i>
        </span>
        <span className="dateNavigationIcon">
          <i
            class="material-icons"
            onClick={() => this.props.changeDate(today)}
          >
            today
          </i>
        </span>
        <span className="dateNavigationIcon">
          <i
            class="material-icons"
            onClick={() => this.props.changeDate(tomorrow)}
          >
            arrow_forward
          </i>
        </span>
      </div>
    );
  }
}

export default DateNavigation;
