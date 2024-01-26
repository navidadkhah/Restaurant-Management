import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProfilePrivateRoute = () => {
  let auth = localStorage.getItem("user-Token").length>0;
  return auth ? <Outlet /> : <Navigate to="/home" />;
};
