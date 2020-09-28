import React from "react";
import { Redirect } from "react-router-dom";
import { useStateValue } from "./datalayer/StateProvider";

const PrivateRoute = ({ children }) => {
  // Add your own authentication on the below line.
  const [{ role }, dispatch] = useStateValue();
  const isLoggedIn = Boolean(role);

  return isLoggedIn ? (
    <>{children}</>
  ) : (
    <Redirect to={{ pathname: "/login" }} />
  );
};

export default PrivateRoute;
