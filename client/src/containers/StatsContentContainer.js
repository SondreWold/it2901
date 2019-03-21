import React, { Component } from 'react'
import { connect } from "react-redux";

import { getAbsentEmpsPerMonth } from "../actions/statsActions/absentEmpsPerMonthAction";

import Dropdown from "./../components/Stats/Dropdown";
import AbsenseGraph from "./../components/Stats/AbsenseGraph";
import AbsencePerMonthGraph from "./../components/Stats/AbsencePerMonthGraph";

class StatsContentContainer extends Component {
	componentDidMount() {
		// march = 3
		this.props.getAbsentEmpsPerMonth(3)
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
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAbsentEmpsPerMonth: month => dispatch(getAbsentEmpsPerMonth(month))
  };
};

const mapStateToProps = state => ({
  absentEmps: state.absentEmpsPerMonth.data
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsContentContainer);
