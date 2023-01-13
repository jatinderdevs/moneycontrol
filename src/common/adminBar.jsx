import React from "react";
import { Link } from "react-router-dom";

const AdminBar = ({ user }) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark  mb-4">
        <Link className="navbar-brand" to="/admin">
          admin Pannel
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="form-inline my-2 my-lg-0">
            {!user && (
              <Link to="/signin" className="btn btn-warning">
                SignIn
              </Link>
            )}
            {user && (
              <div>
                <Link to="/user" className="btn btn-light btn-sm mr-2">
                  <div>
                    <img
                      src="https://i.pinimg.com/originals/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                      width={23}
                      alt=""
                      className="rounded-circle"
                    />{" "}
                    {user.username}
                  </div>
                </Link>
                <Link to="/signout" className="btn btn-danger btn-sm">
                  <i className="fa fa-sign-out"></i> Sign Out
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default AdminBar;
