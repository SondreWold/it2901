import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import "./graph.css";
import Colors from "../../constants/Colors.js";

class AbsencePerWeekGraph extends Component {
  formatRatioData = ratios => {
    const graphData = { names: [], labels: [], data: [] };

    for (let i = 0; i < ratios.length; i++) {
      if (!graphData.names.includes(ratios[i].name)) {
        graphData.names.push(ratios[i].name);
      }

      if (!graphData.labels.includes(ratios[i].date)) {
        graphData.labels.push(ratios[i].date);
      }
    }

    for (let i = 0; i < graphData.names.length; i++) {
      const dataset = { label: graphData.names[i], data: [] };
      for (let i = 0; i < ratios.length; i++) {
        if (ratios[i].name === dataset.label) {
          dataset.data.push(ratios[i].ratio);
        }
      }
      graphData.data.push(dataset);
    }
    return graphData;
  };

  render() {
    const graphData = this.formatRatioData(this.props.ratios);
    const chartData = {
      labels: graphData.labels,
      datasets: []
    };

    graphData.data.forEach(ds => {
      const col = Colors.randomColor();
      chartData.datasets.push({
        label: ds.label,
        data: ds.data,
        fill: "false",
        pointBackgroundColor: col,
        borderColor: col,
        backgroundColor: col
      });
    });

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

export default AbsencePerWeekGraph;
