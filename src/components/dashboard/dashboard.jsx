import React, { Component } from "react";
import { Route } from "react-router-dom";
import NavBar from "../../common/navBar";
import Footer from "../../common/footer";
import { getCurrentUser } from "../../services/auth";
import Reports from "../reports/index";

import Index from "./index";
import CreateEntery from "./createEntry";

class Dashboard extends Component {
  state = {};
  componentDidMount() {
    const user = getCurrentUser();

    this.setState({ user });
  }
  render() {
    return (
      <React.Fragment>
        {<NavBar user={this.state.user} />}
        <Route exact path="/dashboard" component={Index} />
        <Route
          exact
          path="/dashboard/entery/:type?/:cateid?"
          component={CreateEntery}
        />
        <Route exact path="/dashboard/reports" component={Reports} />
        <Footer />
      </React.Fragment>
    );
  }
}

export default Dashboard;
