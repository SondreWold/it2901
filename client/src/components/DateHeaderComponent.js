import React from "react";
import { connect } from "react-redux";

class DateHeaderComponent extends React.Component {
  render() {
    return <h4>{this.props.date}</h4>;
  }
}

const mapStateToProps = state => ({
  date: state.date.selectedDate
});

export default connect(mapStateToProps)(DateHeaderComponent);
