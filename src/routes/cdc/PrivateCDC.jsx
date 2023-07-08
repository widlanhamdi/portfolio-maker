import React from "react";
import AuthCDC from "../../utils/AuthCDC";
import Layout from "../../pages/cdc/layouts/Layout";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateCDC() {
  if (!AuthCDC.isAuthorization()) {
    return <Navigate to="/cdc/login" />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
