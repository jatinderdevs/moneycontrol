import React, { Component } from "react";
import { Route } from "react-router-dom";
import NavBar from "../../common/navBar";
import Footer from "../../common/footer";

import { getCurrentUser } from "../../services/auth";

import CreateExpenseCard from "../expenseCate/create";
import Index from "../expenseCate/index";
import Edit from "../expenseCate/edit";
import { Link } from "react-router-dom";

class ManageApp extends Component {
  state = {
    user: [],
  };
  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }
  render() {
    return (
      <React.Fragment>
        {<NavBar user={this.state.user} />}
        <div className="row">
         
          <div className="col-md-12">
            <Route exact={true} path="/manageapp/" component={Index} />
            <Route
              exact
              path="/manageapp/create"
              component={CreateExpenseCard}
            />
            <Route exact={true} path="/manageapp/edit/:id" component={Edit} />
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default ManageApp;
