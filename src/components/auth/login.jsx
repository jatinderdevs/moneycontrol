import Joi from "joi-browser";
import React from "react";
import signinimg from "../../public/assets/images/signin.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../../common/Input";
import Form from "../../common/Form";
import { signIn } from "../../services/auth";
import { getCurrentUser } from "../../services/auth";

class SignIn extends Form {
  schema = {
    username: Joi.string().min(4).max(15).required(),
    password: Joi.string().max(15).required(),
  };

  doSumbit = async () => {
    const { username, password } = this.state.data;
    var format = /^[a-zA-Z0-9_]*$/;

    if (!username.match(format)) {
      const error = { ...this.state.error };
      error["username"] = "No Special charcter and space allowed in username";
      console.log("not match");
      this.setState({ error });
      return false;
    }

    try {
      await toast.promise(signIn(username, password), {
        pending: "Logging...",
        success: "successfully Login",
        error: "Something went wrong",
      });
      window.location = "/dashboard";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
  };
  componentDidMount() {
    const user = getCurrentUser();
    if (user) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    const { username, password } = this.state.error;
    return (
      <React.Fragment>
        <section className="auth">
          <div className="wrapper">
            <div className="flex-column-reverse flex-lg-row flex-md-row row">
              <div className=" col-md-7">
                <div className="coverimg">
                  <img src={signinimg} className="img-fluid" alt="" />
                  <Link to="/signup">create an account</Link>
                </div>
              </div>
              <div className="col-md-5 ">
                <div className="signIn">
                  <h1 className="mb-4">sign in</h1>
                  <div className="authLink mb-2">
                    <ul className="socialLink">
                      <li>
                        <Link to="/" className="socialBtn fb">
                          <i className="fa fa-facebook fa-2x"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="/" className="socialBtn google">
                          <i className="fa fa-google fa-2x"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="/" className="socialBtn insta">
                          <i className="fa fa-instagram fa-2x"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <form onSubmit={this.HandleSumbit}>
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
                        type="password"
                        style={{ width: "90%" }}
                        name="password"
                        icon="fa fa-lock"
                        onChange={this.HandleChange}
                        placeholder="Password"
                        error={password}
                      />
                    }

                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                      />
                      <label className="form-check-label" for="exampleCheck1">
                        Rember Me
                      </label>
                    </div>
                    <hr />
                    <button type="submit" className="customBtn">
                      LogIn
                    </button>
                  </form>
                  <p className="mt-2 text-right">
                    <Link to="/forgotpassword">Forget your password?</Link>
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

export default SignIn;
