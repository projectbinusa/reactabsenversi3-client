import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ element: Component }) {
  const location = useLocation();

  const isTokenValid = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    try {
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = tokenData.exp * 1000;
      const currentTime = Date.now();
      return currentTime < expirationTime;
    } catch (e) {
      return false;
    }
  };

  const isLoginPath = location.pathname === "/login";
  const tokenValid = isTokenValid();

  useEffect(() => {
    if (tokenValid && isLoginPath) {
      <Navigate to="/" replace />;
    }
  }, [tokenValid, isLoginPath]);

  if (!tokenValid && !isLoginPath) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (tokenValid && isLoginPath) {
    return <Navigate to="/" replace />;
  }

  return <Component />;
}

export default PrivateRoute;
