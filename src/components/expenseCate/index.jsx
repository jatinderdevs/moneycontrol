import React, { Component } from "react";
import { cates } from "../../services/cateService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Remove } from "../../services/cateService";
import Loader from "../../common/loader";

class CateIndex extends Component {
  state = {};
  async componentDidMount() {
    const { data } = await cates();
    this.setState({ data });
    this.setState({ loading: false });
  }
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
        <Link to="/manageapp/create" className="btn btn-sm btn-dark">
          Create New Card
        </Link>
        <hr />
        {data ? (
          <table className="table table-bordered text-center table-hover text-capitalize">
            <thead className="bg-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((c) => {
                return (
                  <tr key={c._id}>
                    <td>#</td>
                    <td>{c.name}</td>
                    <td>
                      <Link
                        to={`/manageapp/edit/${c._id}`}
                        className="btn btn-outline-primary btn-sm"
                      >
                        <i className="fa fa-pencil"></i>
                      </Link>
                      &nbsp;&nbsp;
                      <button
                        onClick={() => this.handleDelete(c._id)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        <i className="fa fa-trash"></i>
                      </button>
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

export default CateIndex;
