import React, { Component } from "react";
import { duePayments } from "../../services/duePaymentsService";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { Remove, isDone } from "../../services/duePaymentsService";
import Loader from "../../common/loader";

class DueIndex extends Component {
  state = {};
  async componentDidMount() {
    const { data } = await duePayments();
    this.setState({ data });
    this.setState({ loading: false });
  }
  handleDone = async (id) => {
    if (!window.confirm("Is this payment Completed ?")) return;
    const originalData = this.state.data;
    const updated = this.state.data.filter((x) => x._id !== id);
    this.setState({ data: updated });
    try {
      await isDone(id);
      toast.success("Payment Done");
      this.props.history.push("/dashboard/");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Record has already deleted");

      this.setState({ data: originalData });
    }
  };
  handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    const originalData = this.state.data;
    const updated = this.state.data.filter((x) => x._id !== id);
    this.setState({ data: updated });
    try {
      await Remove(id);
      toast.success("Record has been deleted successfully");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("Record has already deleted");

      this.setState({ data: originalData });
    }
  };
  render() {
    const { data, loading } = this.state;
    return (
      <React.Fragment>
        <h1>Due Payments</h1>
        <Link
                    to="/duepayment/create"
                    className="btn text-body btn-sm btn-warning"
                  >
                    Add Due Payments
                  </Link>
        <hr />
        {data ? (
          <table className="table table-bordered text-center table-hover text-capitalize">
            <thead className="bg-light">
              <tr>
              
                <th>Amount</th>
                <th>Tag</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((c) => {
                return (
                  <tr key={c._id}>
                    
                    <td>{c.amount}</td>
                    <td>{c.tag}</td>
                    <td >
                      <div id="btnLayout">
                      <button
                        onClick={() => this.handleDone(c._id)}
                        className="btn btn-success btn-sm"
                      >
                        <i className="fa fa-check"></i>isDone
                      </button>
                      &nbsp;&nbsp;
                      <button
                        onClick={() => this.handleDelete(c._id)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                      </div>
                     
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <Loader loading={loading} />
        )}
      </React.Fragment>
    );
  }
}

export default DueIndex;
