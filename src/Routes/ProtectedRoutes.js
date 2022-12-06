import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoutes = ({ children }) => {
  const { token } = useSelector((state) => state.Auth);
  if (token) return children;
  return <Navigate to="/login" />;
};

export default ProtectedRoutes;
