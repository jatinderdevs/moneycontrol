import React, { Component } from "react";
import NavBar from "../../common/navBar";
import Footer from "../../common/footer";
import { getCurrentUser } from "../../services/auth";

class About extends Component {
  state = {};
  componentDidMount() {
    const user = getCurrentUser();

    this.setState({ user });
  }
  render() {
    return (
      <React.Fragment>
        {<NavBar user={this.state.user} />}
        <section>
          <h1>About App</h1>
          <p>
            This app is purely made for users who want to track their day-to-day
            expenses and earnings. in this app, the user can make an entry of
            any earning and expense and this app will automatically calculate
            and show data in charts and tables. it shows the monthly based data
            and at the beginning of the new month, entries will hide which are
            made last month and start from the new month. if you want to see
            your old entries you can download your statement(under the reports
            section) to analyze past data.
          </p>
          <hr />
          <h3>Policies</h3>
          <ol>
            <li>
              <p>
                User privacy is our first priority.any data related to the user
                may not share with anyone even we can not access user data and
                entries which he/she made from this app.
              </p>
            </li>
            <li>
              <p>
                User email and contact information will not share with any
                third-party software or service.however, user may receive some
                promotional emails from our end.
              </p>
            </li>
            <li>
              <p>This app will always free forever</p>
            </li>
          </ol>
          <hr />
          <h3>Help</h3>
          <p>
            any help or suggestions please feel free to drop a mail at{" "}
            <a href="mailto:jssingh134@gmail.com">Jssingh134@gmail.com</a> or
            call to +91 9041737383
          </p>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default About;
