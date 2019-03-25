import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from "moment";
import * as fn from "../constants/Functions"
import { getAbsentEmpsPerMonth } from "../actions/statsActions/absentEmpsPerMonthAction";
import { getWorkingEmpsAbsChildren } from "../actions/statsActions/workingEmpsAbsChildrenAction";
import { getRatio } from "../actions/statsActions/getRatioAction";

import Dropdown from "./../components/Stats/Dropdown";
import AbsenseGraph from "./../components/Stats/AbsenseGraph";
import AbsencePerWeekGraph from "./../components/Stats/AbsencePerWeekGraph";

class StatsContentContainer extends Component {
	componentDidMount() {
		// checks last week
		this.props.getRatio(
			moment().subtract(1, 'week').format("YYYY-MM-DD"),
			moment().format("YYYY-MM-DD")
			)
	}

  render() {
    return (
      <div>
        <Dropdown />
        <AbsencePerWeekGraph 
        	ratios={this.props.ratios}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAbsentEmpsPerMonth: month => dispatch(getAbsentEmpsPerMonth(month)),
    getWorkingEmpsAbsChildren: date => dispatch(getWorkingEmpsAbsChildren(date)),
    getRatio: (fromDate, toDate) => dispatch(getRatio(fromDate, toDate))
  };
};

const mapStateToProps = state => ({
  absentEmps: state.absentEmpsPerMonth.data,
  workingEmpsAbsChildren: state.workingEmpsAbsChildren.data,
  ratios: state.ratio.data
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsContentContainer);
