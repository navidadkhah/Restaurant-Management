import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const WebPrivateRoute = () => {
    let auth = false
    return auth ? <Outlet /> : <Navigate to="/web-admin" />;
};