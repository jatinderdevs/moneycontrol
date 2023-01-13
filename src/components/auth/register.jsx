import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import signupimg from "../../public/assets/images/signup.png";

import Input from "../../common/Input";
import Form from "../../common/Form";
import { Register } from "../../services/auth";

class SignUp extends Form {
  schema = {
    username: Joi.string().min(4).max(15).required(),
    password: Joi.string().max(15).required(),
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
  };
  doSumbit = async () => {
    try {
      const user = { ...this.state.data };
      var format = /^[a-zA-Z0-9_]*$/;

      if (!user.username.match(format)) {
        const error = { ...this.state.error };
        error["username"] = "No Special charcter and space allowed in username";

        this.setState({ error });
        return false;
      }

      await toast.promise(Register(user), {
        pending: "Loading...",
        success: "Successfully Registered",
        error: "Something went wrong",
      });

      this.props.history.push("/signin");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
  };
  render() {
    const { username, password, email, fullname } = this.state.error;

    return (
      <React.Fragment>
        <section className="auth">
          <div className="wrapper">
            <div className="row">
              <div className="col-md-7">
                <div className="coverimg">
                  <img src={signupimg} className="img-fluid" alt="" />
                  <Link to="/signin">Already Have an Account</Link>
                </div>
              </div>
              <div className="col-md-5">
                <div className="signIn">
                  <h1 className="mb-4">sign up</h1>

                  <form onSubmit={this.HandleSumbit}>
                    {
                      <Input
                        type="text"
                        style={{ width: "90%" }}
                        name="fullname"
                        icon="fa fa-user"
                        onChange={this.HandleChange}
                        placeholder="Jhon"
                        error={fullname}
                      />
                    }
                    {
                      <Input
                        type="text"
                        style={{ width: "90%" }}
                        name="username"
                        icon="fa fa-user"
                        onChange={this.HandleChange}
                        placeholder="Username"
                        error={username}
                      />
                    }
                    {
                      <Input
                        type="email"
                        style={{ width: "89%" }}
                        name="email"
                        icon="fa fa-envelope"
                        onChange={this.HandleChange}
                        placeholder="Jhon@abc.com"
                        error={email}
                      />
                    }

                    {
                      <Input
                        type="password"
                        style={{ width: "90%" }}
                        name="password"
                        icon="fa fa-lock"
                        onChange={this.HandleChange}
                        placeholder="Password"
                        error={password}
                      />
                    }
                    <hr />
                    <button type="submit" className="customBtn">
                      Register
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default SignUp;
