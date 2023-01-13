import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import SignIn from "../components/auth/login";
import SignUp from "../components/auth/register";
import LogOut from "../components/auth/logout";
import ForgotPassword from "../components/auth/forgotPassword";
import ResetPassword from "../components/auth/resetPasssword";
import MailSent from "../components/auth/mailsent";
import Dashboard from "../components/dashboard/dashboard";
import About from "../components/dashboard/about";
import Manageapp from "../components/dashboard/manageApp";
import Profile from "../components/user/profile";
import Statement from "../components/reports/statement";
import EditEntry from "../components/reports/enteryEdit";
import NotFound from "../components/error/404";
import AdminPannel from "../components/admin/dashboard";
//due payment Routers
import DuePayments from "../components/duePayments/mainRoute";

import ProtectedRoute from "../common/ProtectedRoute";
import AdminRoute from "../common/adminRoute";

class Routes extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signout" component={LogOut} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/resetpassword/:token" component={ResetPassword} />
          <Route exact path="/about" component={About} />

          <Route exact path="/mailsent" component={MailSent} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <ProtectedRoute path="/manageapp" component={Manageapp} />
          <ProtectedRoute path="/user" component={Profile} />
          <ProtectedRoute path="/statement" component={Statement} />
          <ProtectedRoute path="/entry/:id" component={EditEntry} />
          {/* due payment */}
          <ProtectedRoute path="/duepayment" component={DuePayments} />

          <AdminRoute path="/admin" component={AdminPannel} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Routes;
