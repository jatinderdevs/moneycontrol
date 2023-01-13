import React from "react";
import Joi from "joi-browser";
import Form from "../../common/Form";
import Input from "../../common/Input";
import { toast } from "react-toastify";

import { updatePassword } from "../../services/userService";

class UserInfo extends Form {
  doSumbit = async () => {
    const { oldpassword, newpassword } = this.state.data;
    try {
      await updatePassword(oldpassword, newpassword);
      toast.success("Password has been updated successfully");
      this.props.history.push("/dashboard");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
  };
  schema = {
    oldpassword: Joi.string().required(),
    newpassword: Joi.string().required(),
  };
  render() {
    const { oldpassword, newpassword } = this.state.error;
    return (
      <div className="profilebox">
        <h4>Personal Info</h4>
        {this.props.user && (
          <table className="table ">
            <tr>
              <th>Name</th>
              <td>{this.props.user.fullname}</td>
            </tr>
            <tr>
              <th>UserName</th>
              <td>{this.props.user.username}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{this.props.user.email}</td>
            </tr>
          </table>
        )}

        <h4>Update Password</h4>
        <form onSubmit={this.HandleSumbit}>
          <Input
            type="password"
            style={{ width: "90%" }}
            name="oldpassword"
            icon="fa fa-key"
            onChange={this.HandleChange}
            placeholder="******"
            error={oldpassword}
          />
          <Input
            type="password"
            style={{ width: "90%" }}
            name="newpassword"
            icon="fa fa-key"
            onChange={this.HandleChange}
            placeholder="******"
            error={newpassword}
          />

          <hr />
          <button type="submit" className="btn btn-dark btn-sm">
            Update Password
          </button>
        </form>
      </div>
    );
  }
}

export default UserInfo;
