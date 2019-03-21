import React, { Component } from "react";
import Dropdown from "./../components/Statistics/Dropdown";
import AbsenseGraph from "./../components/Statistics/AbsenseGraph";

class StatsContentContainer extends Component {
  render() {
    let monthLabel = [
      "Januar",
      "Februar",
      "Mars",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober"
    ];

    let monthBase1 = [2, 3, 1, 0.2, 3, 2, 4, 2, 1, 3];
    let monthBase2 = [1, 3, 2, 1, 3, 4, 2, 2, 1, 3];
    let monthBase3 = [1.3, 2, 3, 2.7, 1.7, 2.3, 1.5, 0.7, 3.9, 2.8];
    let monthBase4 = [0.3, 1.7, 3.2, 2.1, 2.7, 3.2, 2.5, 0.9, 3.1, 2.2];

    return (
      <div>
        <Dropdown />
        <AbsenseGraph
          labels={monthLabel}
          base1Data={monthBase1}
          base2Data={monthBase2}
          base3Data={monthBase3}
          base4Data={monthBase4}
        />
      </div>
    );
  }
}

export default StatsContentContainer;
