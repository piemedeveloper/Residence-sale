import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

const OpenRoute = ({ children }) => {
  const { pathname } = useLocation();
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? (
    children
  ) : (
    <Navigate to={"/dashboard"} state={pathname} />
  );
};

export default OpenRoute;
