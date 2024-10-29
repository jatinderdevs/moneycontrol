import React, { Component } from "react";

import AdminCard from "../admin/adminCard";
import { getCurrentUser } from "../../services/auth";

class Index extends Component {
  state = {};
  componentDidMount() {
    const user = getCurrentUser();

    this.setState({ user });
  }
  render() {
    return (
      <React.Fragment>
        <AdminCard />
      </React.Fragment>
    );
  }
}

export default Index;
