import React, { Component } from "react";
import NavBar from "../../common/navBar";
import Footer from "../../common/footer";
import Img from "../../public/assets/images/user.png";
import UserInfo from "../../components/user/userInfo";
import { getCurrentUser } from "../../services/auth";

class Profile extends Component {
  state = {};
  componentDidMount() {
    const user = getCurrentUser();

    this.setState({ user });
  }
  render() {
    return (
      <React.Fragment>
        {<NavBar user={this.state.user} />}
        <div className="row">
          <div className="col-md-4">
            <div className="imgbox bg-light py-3 text-center">
              <img src={Img} alt="" width={250} className="img-fluid" />
            </div>
          </div>
          <div className="col-md-8">
            {<UserInfo user={this.state.user} history={this.props.history} />}
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Profile;
