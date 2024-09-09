import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ element: Component }) {
  const location = useLocation();

  // Fungsi untuk memeriksa apakah token sudah kedaluwarsa atau tidak ada
  const isTokenValid = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    try {
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = tokenData.exp * 1000;
      const currentTime = Date.now();
      return currentTime <= expirationTime;
    } catch (e) {
      return false;
    }
  };

  // Jika token tidak valid atau tidak ada, arahkan ke halaman login
  if (!isTokenValid()) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Component />;
}

export default PrivateRoute;
