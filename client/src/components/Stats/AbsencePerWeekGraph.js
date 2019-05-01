import React, { Component } from "react";
import moment from "moment";
import localization from "moment/locale/nb";
import { Line } from "react-chartjs-2";
import "./graph.css";
import Colors from "../../constants/Colors.js";

class AbsencePerWeekGraph extends Component {

	// formats the raw data for the Chart.js lib
  formatRatioData = (ratios, skipWeekend = true) => {
    const graphData = { names: [], labels: [], data: [] };

    // strips of saturdays and sundays if skipWeekend = true
    if (skipWeekend){
    	ratios = ratios.filter(
  			r => [6, 0].indexOf(moment(r.date).day()) === -1
			)
    }

    for (let i = 0; i < ratios.length; i++) {
      if (!graphData.names.includes(ratios[i].name)) {
        graphData.names.push(ratios[i].name);
      }

      const formattedDate = moment(ratios[i].date)
			      .locale("nb", localization)
			      .format("Do MMMM")

      if (!graphData.labels.includes(formattedDate)) {
        
        graphData.labels.push(formattedDate);
      	
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
    const graphData = this.formatRatioData(this.props.ratios, this.props.skipWeekend);
    const chartData = {
      labels: graphData.labels,
      datasets: []
    };

    var i = 0;
    graphData.data.forEach(ds => {
      chartData.datasets.push({
        label: ds.label,
        data: ds.data,
        fill: "false",
        pointBackgroundColor: Colors.statColors[i],
        borderColor: Colors.statColors[i],
        backgroundColor: Colors.statColors[i]
      });
      i += 1;
    });

    return (
      <div>
        <div className="graphContainer">
          <Line
            data={chartData}
            height={400}
            options={{
              maintainAspectRatio: false,
              scales: {
                yAxes: [
                  {
                    scaleLabel: {
                      display: true,
                      labelString: "Over- og underbemanning"
                    }
                  }
                ],
                xAxes: [
                  {
                    scaleLabel: {
                      display: true,
                      labelString: "Dato"
                    }
                  }
                ]
              }
            }}
          />
        </div>
      </div>
    );
  }
}

export default AbsencePerWeekGraph;
