import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { API_DUMMY } from "./api";

function PrivateRoute({ element: Component }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isAccountDeleted, setIsAccountDeleted] = useState(false);
  const location = useLocation();

  // Fungsi untuk memeriksa apakah token sudah kedaluwarsa atau tidak ada
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

  // Fungsi untuk memeriksa status akun
  const checkAccountStatus = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      const userId = tokenData.id;

      let response;
      try {
        response = await axios.get(
          `${API_DUMMY}/api/superadmin/getbyid/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        try {
          response = await axios.get(
            `${API_DUMMY}/api/admin/getById/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (error) {
          response = await axios.get(
            `${API_DUMMY}/api/user/getUserBy/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
      }

      const deletedStatus = response.data.deleted;
      if (deletedStatus === 1 || deletedStatus === 0) {
        setIsAccountDeleted(true);
      } else {
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error("Error checking account status:", e);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    if (isTokenValid()) {
      checkAccountStatus();
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Jika token tidak valid, akun terhapus, atau tidak ada, arahkan ke halaman login
  if (isAuthenticated === false || isAccountDeleted) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Jika masih dalam proses pemeriksaan status, tidak merender apapun
  if (isAuthenticated === null) {
    return null;
  }

  return <Component />;
}

export default PrivateRoute;
