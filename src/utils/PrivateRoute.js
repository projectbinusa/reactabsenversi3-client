import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ element: Component }) {
  const location = useLocation();

  const isTokenExpired = () => {
    const token = localStorage.getItem("token");
    if (!token) return true; // Jika token tidak ada, diasumsikan token telah kedaluwarsa
    const tokenData = JSON.parse(atob(token.split(".")[1])); // Mengurai bagian data token JWT
    const expirationTime = tokenData.exp * 1000; // Waktu kedaluwarsa dalam format milidetik
    const currentTime = Date.now(); // Waktu saat ini dalam format milidetik
    return currentTime > expirationTime; // Memeriksa apakah token telah kedaluwarsa
  };

  if (isTokenExpired()) {
    localStorage.removeItem("token"); 
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Component />;
}

export default PrivateRoute;
