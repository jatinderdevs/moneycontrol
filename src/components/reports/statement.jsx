import React from "react";
import NavBar from "../../common/navBar";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Form from "../../common/Form";
import Input from "../../common/Input";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../services/auth";
import { downloadXLSFile } from "../../services/dataManage";

class Statement extends Form {
  schema = {
    startDate: Joi.date().required(),
    endDate: Joi.date().greater(Joi.ref("startDate")).required(),
  };
  doSumbit = async () => {
    const dates = { ...this.state.data };
    try {
      downloadXLSFile(dates);
      toast.success("sucees");
      this.props.history.push("/dashboard/reports");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        alert(ex.response.data);
      }
    }
  };
  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { startDate, endDate } = this.state.error;
    return (
      <React.Fragment>
        <NavBar user={this.state.user} />
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-title">
                <h1 className="alert">Get Statement</h1>
              </div>
              <div className="card-body">
                <form action="" onSubmit={this.HandleSumbit}>
                  <Input
                    type="date"
                    style={{ width: "90%" }}
                    name="startDate"
                    icon="fa fa-calendar"
                    onChange={this.HandleChange}
                    error={startDate}
                  />
                  <Input
                    type="date"
                    style={{ width: "90%" }}
                    name="endDate"
                    icon="fa fa-calendar"
                    onChange={this.HandleChange}
                    error={endDate}
                  />
                  <hr />
                  <p>select start and date for downloading statement</p>

                  <button type="submit" className="btn btn-primary">
                    Download
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
      </React.Fragment>
    );
  }
}

export default Statement;
