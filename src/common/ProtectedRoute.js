import { Redirect, Route } from "react-router-dom";
import { getCurrentUser } from "../services/auth";

const ProtectedRoute = (props) => {
  const user = getCurrentUser();

  if (!user) {
    return (
      <Redirect
        to={{
          pathname: "/signin",
          state: { from: props.location },
        }}
      />
    );
  }

  return <Route {...props} />;
};

export default ProtectedRoute;
