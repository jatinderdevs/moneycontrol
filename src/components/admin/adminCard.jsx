import React, { Component } from "react";
import { UserCount } from "../../services/adminServices";
import { Link } from "react-router-dom";

class AdminCard extends Component {
  state = {};
  onLoad = async () => {
    const { data: userCount } = await UserCount();
    this.setState({ userCount });
  };
  componentDidMount() {
    this.onLoad();
  }
  render() {
    return (
      <React.Fragment>
        <h1>welcome to admin panel</h1>
        <hr />
        <div className="row">
          <div className="col-md-4">
            <div className="card bg-dark text-white mb-3">
              <div className="card-title">
                <h3 className="alert bg-primary">Users</h3>
              </div>
              <div className="card-body">
                <h1>
                  <i className="fa fa-user "></i> {this.state.userCount}
                </h1>
                <p className="text-white">number of users registerd</p>
                <Link to="/admin/users" className="btn btn-primary btn-sm">
                  View
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-dark text-white mb-3">
              <div className="card-title">
                <h3 className="alert bg-danger">Bugs</h3>
              </div>
              <div className="card-body">
                <h1>
                  <i className="fa fa-bug "></i> 0
                </h1>
                <p className="text-white">number of Bugs</p>
                <Link to="" className="btn btn-danger btn-sm">
                  View
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-dark text-white mb-3">
              <div className="card-title">
                <h3 className="alert bg-warning">Visitors</h3>
              </div>
              <div className="card-body">
                <h1>
                  <i className="fa fa-eye "></i> 0
                </h1>
                <p className="text-white">number of Bugs</p>
                <Link to="" className="btn btn-warning btn-sm">
                  View
                </Link>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminCard;
