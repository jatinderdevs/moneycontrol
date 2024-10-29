import React, { Component } from "react";
import AdminBar from "../../common/adminBar";

import { getCurrentUser } from "../../services/auth";
import { Route } from "react-router-dom";

import Index from "../admin/Index";
import UserTable from "../admin/usersTable";
//update to 29.10.2024
class Dashboard extends Component {
  state = {};
  componentDidMount() {
    const user = getCurrentUser();

    this.setState({ user });
  }
  render() {
    return (
      <React.Fragment>
        <AdminBar user={this.state.user} />
        <Route exact path="/admin" component={Index} />
        <Route exact path="/admin/users" component={UserTable} />
      </React.Fragment>
    );
  }
}

export default Dashboard;
