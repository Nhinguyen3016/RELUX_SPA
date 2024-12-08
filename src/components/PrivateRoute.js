import React from 'react';
import { Navigate } from 'react-router-dom';

// checks the role of the user from localStorage
const PrivateRoute = ({ children, allowedRoles }) => {
    // Use userRole
  const userRole = localStorage.getItem('userRole');  

  if (!userRole || !allowedRoles.includes(userRole)) {
    // Redirect to home or login page if not authorized
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
