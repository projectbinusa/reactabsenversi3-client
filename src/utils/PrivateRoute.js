import React from "react";
import { useLocation, Redirect } from "react-router-dom";

function PrivateRoute({ children, roles }) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Redirect to="/" state={{ from: location }} />;
  }

  if (roles && !roles.includes(userRole)) {
    return <Redirect to="/" state={{ from: location }} />;
  }

  return children;
}

export default PrivateRoute;
