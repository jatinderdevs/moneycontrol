import React from "react";
import Joi from "joi-browser";
import Form from "../../common/Form";
import Input from "../../common/Input";
import { getCate, updateCate } from "../../services/cateService";
import { Link } from "react-router-dom";

class Edit extends Form {
  doSumbit = async () => {
    const cate = { ...this.state.data };
    const id = this.props.match.params.id;

    await updateCate(cate, id);
    this.props.history.push("/manageapp/");
  };
  schema = {
    name: Joi.string().required(),
  };
  async componentDidMount() {
    const id = this.props.match.params.id;
    const { data } = await getCate(id);
    delete data._id;
    this.setState({ data: data });
  }
  render() {
    const { name } = this.state.error;
    return (
      <div className="card">
        <div className="card-title">
          <h3 className="alert alert-primary">Update Expense Card</h3>
        </div>
        <div className="card-body">
          <form onSubmit={this.HandleSumbit}>
            <Input
              type="text"
              style={{ width: "90%" }}
              name="name"
              icon="fa fa-money"
              onChange={this.HandleChange}
              placeholder="eg home Expense"
              value={this.state.data.name}
              error={name}
            />
            <button type="submit" className="btn btn-success">
              Update
            </button>
            &nbsp;&nbsp;&nbsp;
            <Link to="/manageapp" className="btn btn-dark">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Edit;
