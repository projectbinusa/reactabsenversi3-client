// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";

// function PrivateRoute({ element: Component }) {
//   const location = useLocation();

//   // Cek apakah token valid
//   const isTokenValid = () => {
//     const token = localStorage.getItem("token");
//     if (!token) return false;

//     try {
//       // Decode token dan cek waktu expired
//       const tokenData = JSON.parse(atob(token.split(".")[1]));
//       const expirationTime = tokenData.exp * 1000; // Convert to milliseconds
//       const currentTime = Date.now();
//       return currentTime < expirationTime; // Token valid jika belum expired
//     } catch (e) {
//       // Jika parsing token gagal, anggap token tidak valid
//       return false;
//     }
//   };

//   const tokenValid = isTokenValid();
//   const isLoginPath = location.pathname === "/login";

//   // Redirect ke halaman login jika token tidak valid dan bukan di halaman login
//   if (!tokenValid && !isLoginPath) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   // Jika token valid tetapi di halaman login, redirect ke halaman home
//   if (tokenValid && isLoginPath) {
//     return <Navigate to="/" replace />;
//   }

//   // Jika token valid dan bukan di halaman login, render komponen yang diinginkan
//   return <Component />;
// }

// export default PrivateRoute;
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children }) {
  const location = useLocation();

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
}

export default PrivateRoute;
