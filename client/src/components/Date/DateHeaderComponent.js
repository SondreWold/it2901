import React from "react";

class DateHeaderComponent extends React.Component {
  render() {
    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    let date = new Date(this.props.date);
    let formatDate = date.toLocaleDateString("nb-NO", options);
    let formattedDate = formatDate.replace(
      formatDate[0],
      formatDate[0].toUpperCase()
    );

    return (
      <div className="dateHeader">
        <h2>{formattedDate}</h2>
      </div>
    );
  }
}

export default DateHeaderComponent;
