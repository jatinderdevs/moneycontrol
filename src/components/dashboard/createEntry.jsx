import React from "react";
import Joi from "joi-browser";
import QueryString from "query-string";
import { Link } from "react-router-dom";
import Form from "../../common/Form";
import Input from "../../common/Input";
import { Create } from "../../services/enteryService";
import { toast } from "react-toastify";

class Entery extends Form {
  schema = {
    amount: Joi.number().required(),
    tag: Joi.string().required(),
  };
  doSumbit = async () => {
    const { type, cateid } = this.props.match.params;

    const entery = { ...this.state.data };
    entery.paymentType = type;
    entery.categories = cateid;
    try {
      await toast.promise(Create(entery), {
        pending: "Wait",
        success: "Entery Has been Added",
        error: "Something went wrong",
      });
      this.props.history.push("/dashboard/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      }
    }
  };
  render() {
    const { name } = QueryString.parse(this.props.location.search);
    const { amount, tag } = this.state.error;
    return (
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-title">
              <h3 className="alert alert-primary">Make an Entery</h3>
            </div>
            <div className="card-body">
              <strong className="text-uppercase">
                {name ? name : "Earning"}
              </strong>
              <form onSubmit={this.HandleSumbit}>
                <Input
                  type="text"
                  style={{ width: "90%" }}
                  name="amount"
                  icon="fa fa-money"
                  onChange={this.HandleChange}
                  placeholder="eg 1000"
                  error={amount}
                />
                <Input
                  type="text"
                  style={{ width: "90%" }}
                  name="tag"
                  icon="fa fa-tag"
                  onChange={this.HandleChange}
                  placeholder="details"
                  error={tag}
                />
                <button type="submit" className="btn btn-success">
                  Submit
                </button>{" "}
                &nbsp;&nbsp;&nbsp;
                <Link to="/dashboard" className="btn btn-dark">
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    );
  }
}

export default Entery;
