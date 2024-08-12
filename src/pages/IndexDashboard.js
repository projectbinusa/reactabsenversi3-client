import React from "react";
import DashboardSA from "./superadmin/DashboardSA";
import DashboardAdmin from "./admin/Dashboard";
import DashboardUser from "./user/DashboardUser";
import DashboardOrtu from "./orangtua/DashboardOrtu";

function IndexDashboard() {
  const role = localStorage.getItem("role");
  return (
    <div>
      {role == "SUPERADMIN" ? (
        <>
          <DashboardSA></DashboardSA>
        </>
      ) : role == "ADMIN" ? (
        <>
          <DashboardAdmin></DashboardAdmin>
        </>
      ) : role == "USER" ? (
        <>
          <DashboardUser></DashboardUser>
        </>
      ) : role == "Wali Murid" ? (
        <>
          <DashboardOrtu></DashboardOrtu>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default IndexDashboard;
