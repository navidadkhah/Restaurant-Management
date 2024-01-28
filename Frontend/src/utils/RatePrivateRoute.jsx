import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const RatePrivateRoute = () => {
  let auth = localStorage.getItem("res-name");
  return auth?.length > 0 || auth !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/home" />
  );
};
