import React, { Component } from "react";
import moment from "moment";
import { enteries, search, Remove } from "../../services/enteryService";
import Pagination from "../../common/pagination";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../common/loader";

class DataTable extends Component {
  state = {
    data: [],
    pageSize: 10,
    currentPage: 1,
    count: 0,
    isBtnDisable: true,
  };
  async getData() {
    const { pageSize, currentPage } = this.state;
    const { data } = await enteries(pageSize, currentPage);

    const getEnteries = data.enteries;
    const count = data.totalEnteries;
    document.getElementById("search").value = "";
    this.setState({
      data: getEnteries,
      count,
      isBtnDisable: true,
    });
  }
  async componentDidMount() {
    await this.getData();
    this.setState({ loading: false });
  }
  search = async (e) => {
    const query = e.currentTarget.value.trim();
    if (!query) {
      return null;
    }
    const { data } = await search(query);
    this.setState({ data: data, isBtnDisable: false });
  };
  HandleChange = async (page) => {
    const { pageSize } = this.state;

    const { data } = await enteries(pageSize, page);
    const getEnteries = data.enteries;
    const count = data.totalEnteries;
    this.setState({
      data: getEnteries,
      count,
      currentPage: page,
    });
  };
  handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Record?")) return;
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
    const { pageSize, count, currentPage, isBtnDisable, data, loading } =
      this.state;
    return (
      <React.Fragment>
        <div>
          <div className="row">
            <div className="col-md-4">
              <Link to="/statement" className="btn btn-dark mt-4 ">
                Get Statement
              </Link>
            </div>
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <label htmlFor="">Search</label>
              <div className="input-group ">
                <input
                  type="text"
                  onChange={this.search}
                  placeholder="Search by Tag"
                  className="form-control"
                  id="search"
                />
                <div className="input-group-append">
                  <button
                    disabled={isBtnDisable}
                    className="btn btn-primary"
                    onClick={() => this.getData()}
                    type="button"
                  >
                    <i className="fa fa-filter"></i> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
          <hr />

          <table className="table table-responsive-sm tbl table-hover text-center text-capitalize">
            <thead className="alert-primary border-0">
              <tr>
                <th>CreatedAt</th>
                <th>paymentType</th>
                <th>Tag</th>
                <th>Categories</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 && (
                <tr>
                  <td colSpan={6}>
                    <Loader loading={loading} />
                  </td>
                </tr>
              )}
              {this.state.data &&
                this.state.data.map((e) => {
                  return (
                    <tr key={e._id}>
                      <td>{moment(e.createdAt).format("MMMM Do YYYY")}</td>
                      <td>{e.paymentType}</td>
                      <td>{e.tag}</td>
                      <td>{e.categories?.name}</td>
                      <td>
                        <strong
                          className={
                            e.paymentType === "earning"
                              ? `text-success`
                              : `text-danger`
                          }
                        >
                          {e.paymentType === "earning" ? `+` : `-`}
                          {e.amount}
                        </strong>
                      </td>
                      <td>
                        <Link
                          to={`/entry/${e._id}`}
                          className="btn btn-sm btn-outline-primary"
                        >
                          <i className="fa fa-pencil"></i>
                        </Link>
                        &nbsp; &nbsp;
                        <button
                          onClick={() => this.handleDelete(e._id)}
                          className="btn btn-sm btn-outline-danger"
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <Pagination
            pageSize={pageSize}
            itemCount={count}
            onPageChange={this.HandleChange}
            currentPage={currentPage}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default DataTable;
