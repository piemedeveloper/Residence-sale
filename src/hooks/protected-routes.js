import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

const ProtectedRoute = ({ children }) => {
  const { pathname } = useLocation();
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to={"/"} state={pathname} />;
};

// const ProtectedRoute = ({ component: Component }) => {
//   const { isAuthenticated } = useContext(AuthContext);
//   return isAuthenticated ? <Component /> : <Navigate to="/" />;
// };

export default ProtectedRoute;
