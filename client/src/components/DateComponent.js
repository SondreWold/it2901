import React from "react";
import DateSelectorComponent from "./DateSelectorComponent";
import DateHeaderComponent from "./DateHeaderComponent";
import { changeDate } from "./../actions/dateAction";
import { connect } from "react-redux";

class DateComponent extends React.Component {
  componentDidMount() {
    let date = new Date();
    this.props.changeDate(date);
  }

  render() {
    return (
      <div style={dateComponents}>
        <DateHeaderComponent />
        <DateSelectorComponent />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  date: state.date.selectedDate
});

const mapDispatchToProps = dispatch => {
  return {
    changeDate: date => dispatch(changeDate(date))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateComponent);

const dateComponents = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  marginTop: 250
};
