import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../auth";

type ProtectedRouteProps = {
  children: ReactElement;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = isLoggedIn();
  return auth ? children : <Navigate to="/signup" replace />;
};
