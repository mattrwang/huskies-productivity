import React, { ReactElement, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../auth";

type ProtectedRouteProps = {
  children: ReactElement;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [auth, setAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await isLoggedIn();
      setAuth(isAuthenticated);
    };

    checkAuth();
  }, []);

  if (auth === null) {
    return <div></div>;
  }

  return auth ? children : <Navigate to="/login" replace />;
};
