import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProfilePrivateRoute = () => {
  let auth = localStorage.getItem("user-Token");
  return auth?.length>0 || auth!==null ? <Outlet /> : <Navigate to="/home" />;
};
