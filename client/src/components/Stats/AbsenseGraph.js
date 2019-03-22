import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import "./graph.css";

class AbsenseGraph extends Component {
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
