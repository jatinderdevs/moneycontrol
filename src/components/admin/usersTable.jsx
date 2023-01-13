import React, { Component } from "react";
import moment from "moment";
import { Users } from "../../services/adminServices";
import config from "../../config.json";

class userTable extends Component {
  state = {
    data: [],
  };
  onLoad = async () => {
    const { data } = await Users();

    this.setState({ data });
  };
  componentDidMount() {
    this.onLoad();
  }
  render() {
    return (
      <React.Fragment>
        <h1>Users</h1>
        <hr />
        <table className="table text-center table-bordered">
          <thead className="bg-primary text-white">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>UserName</th>
              <th>Email</th>
              <th>CreatedAt</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((u) => {
              return (
                <tr key={u._id}>
                  <td>#</td>
                  <td>
                    <img
                      className="rounded-circle"
                      style={{ width: 40 }}
                      src={`${config.Api}/${u.profileimage}`}
                      alt=""
                    />
                  </td>
                  <td>{u.fullname}</td>
                  <td>
                    <p className="badge-pill badge-dark m-0 py-1">
                      {u.username}
                    </p>
                  </td>
                  <td>
                    <small>{u.email}</small>
                  </td>
                  <td>{moment(u.createdAt).format("DD-MMMM-YYYY")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default userTable;
