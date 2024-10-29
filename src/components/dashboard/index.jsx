import React, { Component } from "react";

import Chart from "../../common/charts";
import Cards from "../../common/expenseCards";

class Index extends Component {
  state = {};
  componentDidMount() {}
  render() {
    return (
      <React.Fragment>
        <Cards />
        <hr />
        <Chart heading={"Last 7 Days"} />
      </React.Fragment>
    );
  }
}

export default Index;
