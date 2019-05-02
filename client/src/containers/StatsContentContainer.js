import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { getAbsentEmpsPerMonth } from "../actions/statsActions/absentEmpsPerMonthAction";
import { changeSelectedDropdownOption } from "../actions/statsActions/dropdownAction";
import { getWorkingEmpsAbsChildren } from "../actions/statsActions/workingEmpsAbsChildrenAction";
import { getRatio } from "../actions/statsActions/getRatioAction";
import Dropdown from "./../components/Stats/Dropdown";
import AbsencePerWeekGraph from "./../components/Stats/AbsencePerWeekGraph";
import "./../components/Stats/graph.css";

class StatsContentContainer extends Component {
  componentDidMount() {
   	this.calculateGraphData("week");
  }

  //time = "week" || time = "month || time = "year"
  calculateGraphData = time => {
    this.props.getRatio(
      moment()
        .subtract(1, time)
        .format("YYYY-MM-DD"),
      moment().format("YYYY-MM-DD")
    );
  };

  render() {
    return (
      <div>
      	<h2>Overbemanning og underbemanning</h2>
        <div className="headerContainer">
          <Dropdown
            className="dropdown"
            changeSelected={this.props.changeSelectedDropdownOption}
            selected={this.props.selectedOption}
            calculateGraphData={this.calculateGraphData}
          />
        </div>
        <AbsencePerWeekGraph type={"Line"} ratios={this.props.ratios} skipWeekend={true}/>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAbsentEmpsPerMonth: month => dispatch(getAbsentEmpsPerMonth(month)),
    getWorkingEmpsAbsChildren: date =>
      dispatch(getWorkingEmpsAbsChildren(date)),
    getRatio: (fromDate, toDate) => dispatch(getRatio(fromDate, toDate)),
    changeSelectedDropdownOption: selectedOption =>
      dispatch(changeSelectedDropdownOption(selectedOption))
  };
};

const mapStateToProps = state => ({
  absentEmps: state.absentEmpsPerMonth.data,
  workingEmpsAbsChildren: state.workingEmpsAbsChildren.data,
  ratios: state.ratio.data,
  selectedOption: state.selectedDropdown.selected
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsContentContainer);
