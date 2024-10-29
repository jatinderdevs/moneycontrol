import React from "react";
import NavBar from "../../common/navBar";
import Footer from "../../common/footer";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import { Edit } from "../../services/enteryService";
import { getCurrentUser } from "../../services/auth";
import { cates } from "../../services/cateService";
import { Update } from "../../services/enteryService";
import { toast } from "react-toastify";
import Form from "../../common/Form";
import Input from "../../common/Input";
import Loader from "../../common/loader";

class EditEntery extends Form {
  schema = {
    amount: Joi.number().required(),
    tag: Joi.string().required(),
    paymentType: Joi.string().required(),
    categories: Joi.string(),
  };
  doSumbit = async () => {
    const entry = { ...this.state.data };
    const cate = document.getElementById("categories").value;

    if (!entry.categories) {
      entry["categories"] = cate;
    }
    const id = this.props.match.params.id;
    await toast.promise(Update(entry, id), {
      pending: "Wait",
      success: "Entry Has been Updated",
      error: "Something went wrong",
    });

    this.props.history.push("/dashboard/reports");
  };
  onLoad = async () => {
    const user = getCurrentUser();

    const id = this.props.match.params.id;
    const { data } = await Edit(id);

    const { data: categories } = await cates();
    this.setState({ user, data, categories, loading: false });
  };
  componentDidMount() {
    this.onLoad();
  }
  render() {
    const { amount, tag } = this.state.error;
    const { data, categories, loading } = this.state;

    return (
      <React.Fragment>
        <NavBar user={this.state.user} />
        {categories ? (
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-title">
                  <h3 className="alert alert-primary">Update entery</h3>
                </div>
                <div className="card-body">
                  <form onSubmit={this.HandleSumbit}>
                    <Input
                      type="text"
                      style={{ width: "90%" }}
                      name="tag"
                      icon="fa fa-tag"
                      onChange={this.HandleChange}
                      value={data.tag}
                      error={tag}
                    />
                    <Input
                      type="text"
                      style={{ width: "90%" }}
                      name="amount"
                      icon="fa fa-money"
                      onChange={this.HandleChange}
                      error={amount}
                      value={data.amount}
                    />

                    <label htmlFor="categories">Select Card Category</label>
                    <select
                      onChange={this.HandleChange}
                      name="categories"
                      className={`txtbox mb-2 text-capitalize`}
                      id="categories"
                    >
                      <option value="earning">Earning</option>
                      {categories &&
                        categories.map((c) => {
                          return (
                            <option
                              key={c._id}
                              selected={
                                c._id === data.categories ? true : false
                              }
                              value={c._id}
                            >
                              {c.name}
                            </option>
                          );
                        })}
                    </select>
                    <hr />
                    <button type="submit" className="btn btn-primary">
                      Update
                    </button>
                    <Link
                      to="/dashboard/reports"
                      className="btn pull-right btn-dark"
                    >
                      Back
                    </Link>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-3"></div>
          </div>
        ) : (
          <Loader loading={loading} />
        )}

        <Footer />
      </React.Fragment>
    );
  }
}

export default EditEntery;
