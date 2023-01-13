import React from "react";
import { Link } from "react-router-dom";
import img from "../../public/assets/images/maisent.png";

const MailSent = () => {
  return (
    <section className="auth">
      <div className="wrapper text-center">
        <div className="row">
          <div className="col-md-12">
            <div className="coverimg ">
              <img src={img} width="40%" className="img-fluid" alt="" />
            </div>
            <h6>Rest Password Link Has been sent to your Email ID</h6>
            <p>
              Click on Reset Password to reset password.Kindly check spam if you
              don't get Email
            </p>
            <Link to="/signin" className="customBtn">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MailSent;
