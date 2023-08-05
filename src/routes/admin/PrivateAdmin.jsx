import React from "react";
import AuthAdmin from "../../utils/AuthAdmin";
import Layout from "../../pages/admin/layouts/Layout";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateAdmin() {
  if (!AuthAdmin.isAuthorization()) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
