import React, { Component } from "react";
import DataTable from "../reports/dataTable";
import TotalReport from "../../common/piechart";
import moment from "moment";
import { enteries } from "../../services/enteryService";
class Reports extends Component {
  state = {
    count: 0,
  };
  onLoad = async () => {
    const { data } = await enteries(10, 1);

    this.setState({ count: data.totalEnteries });
  };
  componentDidMount() {
    this.onLoad();
  }
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-4">
            <h3 className="mt-4 text-capitalize">
              {moment(Date.now()).format("MMMM")} report
            </h3>
            <div style={{ marginTop: 97 }}>
              <TotalReport />
              <hr />
              <small className="text-black-50 text-capitalize">
                calculate total expense and earning and result of final savings
              </small>
            </div>
          </div>
          <div className="col-md-8">
            <DataTable />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Reports;
