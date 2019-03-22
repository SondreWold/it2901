import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from "moment";
import * as fn from "../constants/Functions"
import { getAbsentEmpsPerMonth } from "../actions/statsActions/absentEmpsPerMonthAction";
import { getWorkingEmpsAbsChildren } from "../actions/statsActions/workingEmpsAbsChildrenAction";

import Dropdown from "./../components/Stats/Dropdown";
import AbsenseGraph from "./../components/Stats/AbsenseGraph";
import AbsencePerMonthGraph from "./../components/Stats/AbsencePerMonthGraph";

class StatsContentContainer extends Component {
	componentDidMount() {
		this.props.getAbsentEmpsPerMonth(3)
		const fromDate = moment().startOf('week').add(1, 'days');
		const toDate = moment().endOf('week').add(1, 'days');
		const week = fn.diffDates(fromDate, toDate);
		const data = [];

		// THIS DOESNT WORK YET - BUT WHY???
  	week.forEach( date => {
  		this.props.getWorkingEmpsAbsChildren(date);
  		data.push(this.props.workingEmpsAbsChildren);
  	});

  	console.log("DATA", data);
	}

  render() {
    let months = [
      "Januar",
      "Februar",
      "Mars",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Desember"
    ];

    let monthBase1 = [2, 3, 1, 0.2, 3, 2, 4, 2, 1, 3];
    let monthBase2 = [1, 3, 2, 1, 3, 4, 2, 2, 1, 3, 4, 6];
    let monthBase3 = [1.3, 2, 3, 2.7, 1.7, 2.3, 1.5, 0.7, 3.9, 2.8, 2.3, 3.2];
    let monthBase4 = [0.3, 1.7, 3.2, 2.1, 2.7, 3.2, 2.5, 0.9, 3.1, 2.2, 3.2, 3.2];

    return (
      <div>
        <Dropdown />
        <AbsenseGraph
          labels={months}
          base1Data={monthBase1}
          base2Data={monthBase2}
          base3Data={monthBase3}
          base4Data={monthBase4}
          absentEmps={this.props.absentEmps}
        />
        <AbsencePerMonthGraph 
        	absentEmps={this.props.absentEmps}
        	workingEmpsAbsChildren={this.props.workingEmpsAbsChildren}
        	getWorkingEmpsAbsChildren={this.props.getWorkingEmpsAbsChildren}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAbsentEmpsPerMonth: month => dispatch(getAbsentEmpsPerMonth(month)),
    getWorkingEmpsAbsChildren: date => dispatch(getWorkingEmpsAbsChildren(date))
  };
};

const mapStateToProps = state => ({
  absentEmps: state.absentEmpsPerMonth.data,
  workingEmpsAbsChildren: state.workingEmpsAbsChildren.data
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsContentContainer);
