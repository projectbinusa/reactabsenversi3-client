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
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = localStorage.getItem('token');
    
    const isTokenValid = () => {
        if (!isLoggedIn) return false;
        try {
            const decodedToken = jwtDecode(isLoggedIn);
            const now = Date.now() / 1000;
            return decodedToken.exp > now; 
        } catch (e) {
            return false;
        }
    };

    return (
        <Route
            {...rest}
            render={(props) =>
                isTokenValid() ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default PrivateRoute;

