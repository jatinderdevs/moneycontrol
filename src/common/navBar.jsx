import React from "react";
import { Link } from "react-router-dom";
import Img from "../public/assets/images/user.png";

const NavBar = ({ user }) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary  mb-4">
        <Link className="navbar-brand" to="/dashboard">
          Money Control <small className="font-italic text-warning">Beta</small>
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
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/dashboard">
                Home
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/dashboard/reports">
                Reports <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/manageapp">
                Manage App
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>
          <div className="form-inline my-2 my-lg-0">
            {user ? (
              <>
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
                          src={Img}
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
              </>
            ) : (
              <p className="text-white">Loading...</p>
            )}
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;
