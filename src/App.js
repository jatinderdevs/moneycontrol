import React, { Component } from "react";
import Axios from "axios";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { getJwt } from "./services/auth";

//App Start up
import Routers from "./AppStart/Routers";

//css files
import "./public/css/custom.css";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "react-toastify/dist/ReactToastify.css";

Axios.defaults.headers.common["x-auth-token"] = getJwt();

Axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error("Something Went wrong");
  }
  return Promise.reject(error);
});
class App extends Component {
  render() {
    return (
      <React.Fragment>
        {<ToastContainer />}
        <div className="container">
          <Routers />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
