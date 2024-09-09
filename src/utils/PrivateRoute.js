import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ element: Component }) {
  const location = useLocation();

  const isTokenExpired = () => {
    const token = localStorage.getItem("token");
    if (!token) return true;
    try {
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = tokenData.exp * 1000;
      const currentTime = Date.now();
      return currentTime > expirationTime; // Cek apakah token telah
    } catch (e) {
      return true;
    }
  };

  // const token = localStorage.getItem("token")
  // const tokenData = JSON.parse(atob(token.split(".")[1]));
  // const expirationTime = tokenData.exp * 1000;

  // useEffect(() => {
  //   console.log("expired: ", expirationTime);
  // }, []);

  if (isTokenExpired()) {
    localStorage.removeItem("token");
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Component />;
}

export default PrivateRoute;
