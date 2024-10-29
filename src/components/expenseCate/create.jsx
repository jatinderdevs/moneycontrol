import React from "react";
import Joi from "joi-browser";
import Form from "../../common/Form";
import Input from "../../common/Input";
import { Create } from "../../services/cateService";
import { Link } from "react-router-dom";

class CreateExpenseCard extends Form {
  schema = {
    name: Joi.string().required(),
  };
  doSumbit = async () => {
    const cate = { ...this.state.data };
    await Create(cate);
    this.props.history.push("/manageapp/");
  };
  render() {
    const { name } = this.state.error;
    return (
      <div className="card">
        <div className="card-title">
          <h3 className="alert alert-primary">Create an Expense Card</h3>
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
              error={name}
            />
            <button type="submit" className="btn btn-success">
              Add Card
            </button>{" "}
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

export default CreateExpenseCard;
