import React, { Component } from "react";
import { Route } from "react-router-dom";
import NavBar from "../../common/navBar";
import Footer from "../../common/footer";
import { getCurrentUser } from "../../services/auth";

import Create from "../../components/duePayments/create";
import DueIndex from "../../components/duePayments/index";

class MainRoute extends Component {
  state = {};
  componentDidMount() {
    const user = getCurrentUser();

    this.setState({ user });
  }
  render() {
    return (
      <React.Fragment>
        {<NavBar user={this.state.user} />}
        <Route exact path="/duepayment/" component={DueIndex} />
        <Route exact path="/duepayment/create" component={Create} />

        <Footer />
      </React.Fragment>
    );
  }
}

export default MainRoute;
