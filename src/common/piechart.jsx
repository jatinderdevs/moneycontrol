import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import { totalofthismonth } from "../services/dataManage";
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
  ArcElement,
} from "chart.js";
import Loader from "../common/loader";

class TotalReport extends Component {
  state = {};

  async componentDidMount() {
    const { data } = await totalofthismonth();
    this.setState({ data });
    this.setState({ loading: false });
  }
  render() {
    const { data, loading } = this.state;

    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      ArcElement,
      Tooltip,
      Legend,
      PointElement,
      LineController,
      LineElement,
      Filler
    );
    return (
      <React.Fragment>
        {data ? (
          <Pie
            data={{
              labels: ["Earning", "Expanse", "Saving"],

              datasets: [
                {
                  label: "April",
                  data: [data.earning, data.expense, data.saving],
                  backgroundColor: ["#28a745", "#e33545", "lightblue"],
                  hoverOffset: 4,
                  borderWidth: 0,
                },
              ],
            }}
            height="100%"
            width="100%"
          />
        ) : (
          <Loader loading={loading} />
        )}
      </React.Fragment>
    );
  }
}

export default TotalReport;
