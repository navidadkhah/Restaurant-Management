import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const WebPrivateRoute = () => {
    let auth = localStorage.getItem("web-Token");
    return auth?.length > 0 || auth !== null ? (
      <Outlet />
    ) : (
      <Navigate to="/web-admin" />
    );
  
};