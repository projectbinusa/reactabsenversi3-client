// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";

// function PrivateRoute({ children, roles }) {
//   const location = useLocation();
//   const token = localStorage.getItem("token");
//   const userRole = localStorage.getItem("role");

//   if (!token) {
//     return <Navigate to="/login" state={{ from: location }} />;
//   }

//   if (roles && !roles.includes(userRole)) {
//     return <Navigate to="/login" state={{ from: location }} />;
//   }

//   return children;
// }

// export default PrivateRoute;
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    const isLoggedIn = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
        <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
