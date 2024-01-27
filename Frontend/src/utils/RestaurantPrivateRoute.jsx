import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const RestaurantPrivateRoute = () => {
  let auth = localStorage.getItem("res_Token");
  return auth?.length > 0 || auth !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/restaurant-admin" />
  );
};
