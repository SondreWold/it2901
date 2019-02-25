import React from "react";
import { connect } from "react-redux";

class DateHeaderComponent extends React.Component {
  render() {
    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };

    return (
      <div>
        <h5>{JSON.stringify(this.props.date)}</h5>
        <h5 />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  date: state.date.selectedDate.date
});

export default connect(mapStateToProps)(DateHeaderComponent);
