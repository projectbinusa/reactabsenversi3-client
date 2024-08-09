import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children, roles }) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}

export default PrivateRoute;
