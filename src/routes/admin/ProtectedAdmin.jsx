import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthAdmin from "../../utils/AuthAdmin";

export default function ProtectedAdmin() {
  if (AuthAdmin.getAccessToken()) {
    return <Navigate to="/admin" />;
  }

  return <Outlet />;
}
