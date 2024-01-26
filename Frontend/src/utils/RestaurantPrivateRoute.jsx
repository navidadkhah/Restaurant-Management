import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const RestaurantPrivateRoute = () => {
  let auth = false;
  return auth ? <Outlet /> : <Navigate to="/restaurant-admin" />;
};
