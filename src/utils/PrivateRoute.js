import React from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ element: Component }) {
  const location = useLocation();

  const decodeBase64Url = (base64Url) => {
    const base64 = base64Url
      .replace(/-/g, '+') // mengganti '-' dengan '+'
      .replace(/_/g, '/'); // mengganti '_' dengan '/'
    return atob(base64);
  };

  const isTokenExpired = () => {
    const token = localStorage.getItem("token");
    if (!token) return true; // Jika token tidak ada, diasumsikan token telah kedaluwarsa

    try {
      const tokenData = JSON.parse(decodeBase64Url(token.split(".")[1])); // Mengurai bagian data token JWT
      const expirationTime = tokenData.exp * 1000; // Waktu kedaluwarsa dalam format milidetik
      const currentTime = Date.now(); // Waktu saat ini dalam format milidetik
      return currentTime > expirationTime; // Memeriksa apakah token telah kedaluwarsa
    } catch (error) {
      console.error("Error decoding token:", error);
      return true; // Jika ada kesalahan dalam mendekode token, anggap token tidak valid
    }
  };


  if (isTokenExpired()) {
    localStorage.removeItem("token");
    // sessionStorage.removeItem("token");
    return <Link to="/login" state={{ from: location }} />;
  }

  return <Component />;
}

export default PrivateRoute;
