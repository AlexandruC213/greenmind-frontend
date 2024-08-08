import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const RequireAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const location = useLocation();
  const token = Cookies.get("authToken");

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
