import React from "react";
import { Link } from "react-router-dom";
import Joi from "joi-browser";

import { toast } from "react-toastify";
import Input from "../../common/Input";
import Form from "../../common/Form";
import { forgotPassword } from "../../services/auth";

import img from "../../public/assets/images/forgotpassword.png";

class ForgotPassword extends Form {
  schema = {
    username: Joi.string().min(4).required(),
  };
  doSumbit = async () => {
    try {
      await forgotPassword(this.state.data.username);
      toast.success(
        "Rest Password Link has been sent to your register Email Id"
      );
      this.props.history.push("/mailsent");
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
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
                <div className="coverimg">
                  <img src={img} className="img-fluid" alt="" />
                </div>
              </div>
              <div className="col-md-5">
                <div className="signIn">
                  <h1 className="">Forgot Password</h1>
                  <small className="mb-4 text-capitalize">
                    enter your register username .A reset passsword Link will be
                    sent to your register email.
                  </small>
                  <br />
                  <br />
                  <form onSubmit={this.HandleSumbit}>
                    {
                      <Input
                        type="text"
                        style={{ width: "90%" }}
                        name="username"
                        icon="fa fa-user"
                        onChange={this.HandleChange}
                        placeholder="Username"
                        error={this.state.error.username}
                      />
                    }

                    <hr />
                    <button type="submit" className="customBtn">
                      Send Link
                    </button>
                  </form>
                  <p className="mt-2 text-right">
                    <Link to="/">Sign In</Link>
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

export default ForgotPassword;
