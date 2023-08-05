import React from "react";
import AuthUser from "../../utils/AuthUser";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedUser() {
  if (AuthUser.getAccessToken() && Cookies.get("role") === "admin") return <Navigate to="/admin" />;
  if (AuthUser.getAccessToken() && Cookies.get("role") === "cdc") return <Navigate to="/cdc" />;
  if (AuthUser.getAccessToken() && Cookies.get("role") === "user") return <Navigate to="/profile" />;

  return <Outlet />;
}
