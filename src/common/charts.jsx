import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineController,
  LineElement,
  Filler,
} from "chart.js";

import { chartData } from "../services/dataManage";
import Loader from "../common/loader";

class Chart extends Component {
  state = {};
  async componentDidMount() {
    const { data } = await chartData();
    this.setState({ chartData: data });
    this.setState({ loading: false });
  }
  render() {
    const { chartData, loading } = this.state;
    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend,
      PointElement,
      LineController,
      LineElement,
      Filler
    );
    return (
      <React.Fragment>
        {chartData ? (
          <div>
            <h3>{this.props.heading}</h3>
            <Line
              data={{
                labels: chartData.dayNames,
                fill: true,
                datasets: [
                  {
                    label: "Expenses",
                    data: chartData.weeklyExpenses,
                    backgroundColor: "rgba(255,0,0,.2)",
                    fill: true,
                    borderColor: "rgb(255,0,0)",
                    tension: 0.2,
                  },
                  {
                    label: "Earnings",
                    data: chartData.weeklyEarnings,
                    backgroundColor: "rgba(21,87,36,.2)",
                    borderColor: "rgb(21,87,36)",
                    fill: true,
                    tension: 0.2,
                  },
                ],
              }}
              height={250}
              width={600}
              options={{
                maintainAspectRatio: true,
                scales: {
                  yAxis: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        ) : (
          <Loader loading={loading} />
        )}
      </React.Fragment>
    );
  }
}

export default Chart;
