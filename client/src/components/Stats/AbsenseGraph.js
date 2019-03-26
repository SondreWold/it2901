import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import "./graph.css";

class AbsenseGraph extends Component {
  /*

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


  */

  render() {
    let chartData = {
      labels: this.props.labels,
      datasets: [
        {
          label: "Base 1",
          data: this.props.base1Data,
          fill: "false",
          pointBackgroundColor: "#ffff4d",
          borderColor: "#ffff4d",
          backgroundColor: "#ffff4d"
        },
        {
          label: "Base 2",
          data: this.props.base2Data,
          fill: "false",
          pointBackgroundColor: "#71da71",
          borderColor: "#71da71",
          backgroundColor: "#71da71"
        },
        {
          label: "Base 3",
          data: this.props.base3Data,
          fill: "false",
          pointBackgroundColor: "#ff6666",
          borderColor: "#ff6666",
          backgroundColor: "#ff6666"
        },
        {
          label: "Base 4",
          data: this.props.base4Data,
          fill: "false",
          pointBackgroundColor: "#33ccff",
          borderColor: "#33ccff",
          backgroundColor: "#33ccff"
        }
      ]
    };

    return (
      <div>
        <div className="graphContainer">
          <Line
            data={chartData}
            height={400}
            options={{
              maintainAspectRatio: false
            }}
          />
        </div>
      </div>
    );
  }
}

export default AbsenseGraph;
