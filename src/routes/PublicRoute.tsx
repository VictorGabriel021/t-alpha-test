import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute: React.FC = () => {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/products" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
