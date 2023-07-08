import React from "react";
import AuthCDC from "../../utils/AuthCDC";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedCDC() {
  if (AuthCDC.getAccessToken()) {
    return <Navigate to="/cdc" />;
  }

  return <Outlet />;
}
