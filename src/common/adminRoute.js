import { Redirect, Route } from "react-router-dom";
import { getCurrentUser } from "../services/auth";

const adminROute = (props) => {
  const user = getCurrentUser();

  if (!user) {
    //toast.error('User not authenticated !');
    return (
      <Redirect
        to={{
          pathname: "/signin",
          state: { from: props.location },
        }}
      />
    );
  }

  if (user && !user.isadmin) {
    //toast.error('User not authenticated !');
    return (
      <Redirect
        to={{
          pathname: "/dashboard",
          state: { from: props.location },
        }}
      />
    );
  }

  return <Route {...props} />;
};

export default adminROute;
