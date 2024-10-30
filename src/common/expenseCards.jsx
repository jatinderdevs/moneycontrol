import React, { Component } from "react";
import { Link } from "react-router-dom";
import { catewithTotal, earnTotal } from "../services/dataManage";
import { dueTotal } from "../services/duePaymentsService";
import moment from "moment";

import Loader from "../common/loader";

class Cards extends Component {
  state = {
    cateCards: [],
    earning: 0,
    totalPending:0
  };
  //to add k and m in the end of money
  abbreviateNumber(value) {
    var newValue = value;
    if (value >= 1000) {
      var suffixes = ["", "k", "m", "b", "t"];
      var suffixNum = Math.floor(("" + value).length / 3);
      var shortValue = "";
      for (var precision = 2; precision >= 1; precision--) {
        shortValue = pa$eFloat(
          (suffixNum !== 0
            ? value / Math.pow(1000, suffixNum)
            : value
          ).toPrecision(precision)
        );
        var dotLessShortValue = (shortValue + "").replace(
          /[^a-zA-Z 0-9]+/g,
          ""
        );
        if (dotLessShortValue.length <= 2) {
          break;
        }
      }
      if (shortValue % 1 !== 0) shortValue = shortValue.toFixed(1);
      newValue = shortValue + suffixes[suffixNum];
    }
    return newValue;
  }
  async componentDidMount() {
    const { data } = await catewithTotal();
    const { data:totalPending } = await dueTotal();
    
    const { data: earning } = await earnTotal();
    this.setState({ data, earning ,totalPending});
    this.setState({ loading: false });
  }
  render() {
    const { data, loading } = this.state;
    return (
      <React.Fragment>
        {data ? (
          <div className="row">
            <div className="col-md-4">
              <div className="card mb-3">
                <div className="card-title">
                  <h4 className="alert alert-success rounded-0">Earnings</h4>
                </div>
                <div className="card-body">
                  <h1>$. {this.abbreviateNumber(this.state.earning)}</h1>
                  <p>
                    <i className="fa fa-clock-o"></i> Till now of{" "}
                    {moment(Date.now()).format("MMMM")}
                  </p>
                  <Link
                    to="/dashboard/entery/earning"
                    className="btn btn-sm btn-outline-success"
                  >
                    Add Earning
                  </Link>
                </div>
              </div>
            </div>

            {this.state.data.length === 0 && (
              <div className="col-md-4">
                <div className="card mb-3">
                  <div className="card-title m-0">
                    <h4 className="alert m-0 alert-dark rounded-0">
                      Add new Expense card
                    </h4>
                  </div>
                  <div className="card-body">
                    <p>
                      here you can add expense cards by which you can categories
                      your Expenseses e.g -Home expenses,pe$onal expenseses
                      click on this button to add your fi$t expense card
                    </p>
                    <Link
                      to="/manageapp/create"
                      className="btn btn-sm btn-dark"
                    >
                      Add expense card
                    </Link>
                  </div>
                </div>
              </div>
            )}
            {data.map((c) => {
              return (
                <div key={c._id} className="col-md-4 ">
                  <div className="card mb-3">
                    <div className="card-title ">
                      <h4 className="alert alert-danger text-capitalize rounded-0">
                        {c.name}
                      </h4>
                    </div>
                    <div className="card-body">
                      <h1>$. {this.abbreviateNumber(c.total)}</h1>
                      <p>
                        <i className="fa fa-clock-o"></i> Till now of{" "}
                        {moment(Date.now()).format("MMMM")}
                      </p>
                      <Link
                        to={`/dashboard/entery/expense/${c._id}?name=${c.name}`}
                        className="btn btn-sm btn-outline-danger"
                      >
                        Add Expense
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="col-md-4">
              <div className="card mb-3">
                <div className="card-title">
                  <h4 className="alert alert-warning text-body rounded-0">
                    Due Payments
                  </h4>
                </div>
                <div className="card-body">
                  <h1> {this.abbreviateNumber(this.state.totalPending.dues)}</h1>
                  <p>
                    <i className="fa fa-clock-o"></i> Number of Due Payments
                  </p>
                  <Link
                    to="/duepayment/create"
                    className="btn text-body btn-sm btn-outline-warning"
                  >
                    Add Due Payments
                  </Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Link
                    to="/duepayment/"
                    className="btn text-body btn-sm btn-warning"
                  >
                    Manage
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loader loading={loading} />
        )}
      </React.Fragment>
    );
  }
}

export default Cards;
