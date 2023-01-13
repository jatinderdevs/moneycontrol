import React from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";

import { toast } from "react-toastify";
import Input from "../../common/Input";
import Form from "../../common/Form";
import { resetPasssword } from "../../services/auth";

import img from "../../public/assets/images/resetpassword.png";

class ResetPassword extends Form {
  schema = {
    password: Joi.string().required(),
  };
  doSumbit = async () => {
    try {
      await resetPasssword(
        this.props.match.params.token,
        this.state.data.password
      );
      toast.success("Password has been updated");
      this.props.history.push("/signin");
    } catch (ex) {
      if (ex.response && ex.response.status === 403) {
        toast.error(ex.response.data);
      }
    }
  };
  render() {
    return (
      <React.Fragment>
        <section className="auth">
          <div className="wrapper">
            <div className="row">
              <div className="col-md-7">
                <div className="coverimg text-center">
                  <img src={img} width="70%" className="img-fluid" alt="" />
                </div>
              </div>
              <div className="col-md-5">
                <div className="signIn">
                  <h1 className="">Reset Password</h1>
                  <small className="mb-4 text-capitalize">
                    Set a New Password for your account
                  </small>
                  <br />
                  <br />
                  <br />
                  <form onSubmit={this.HandleSumbit}>
                    {
                      <Input
                        type="password"
                        style={{ width: "90%" }}
                        name="password"
                        icon="fa fa-lock"
                        onChange={this.HandleChange}
                        placeholder="******"
                        error={this.state.error.password}
                      />
                    }

                    <hr />
                    <button type="submit" className="customBtn">
                      Reset Password
                    </button>
                  </form>
                  <p className="mt-2 text-right">
                    <Link to="/signin">Sign In</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default ResetPassword;
