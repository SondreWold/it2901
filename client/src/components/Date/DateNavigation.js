import React from "react";

class DateNavigation extends React.Component {
  render() {
    var date = this.props.date;
    let today = new Date();
    var yesterday = new Date(date.getTime() - 24 * 60 * 60 * 1000);
    var tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000);

    return (
      <div className="dateNavigation">
        <span className="dateNavigationIcon">
          <i
            className="material-icons"
            onClick={() => this.props.changeDate(yesterday)}
          >
            arrow_back
          </i>
        </span>
        <span className="dateNavigationIcon">
          <i
            className="material-icons"
            onClick={() => this.props.changeDate(today)}
          >
            today
          </i>
        </span>
        <span className="dateNavigationIcon">
          <i
            className="material-icons"
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
