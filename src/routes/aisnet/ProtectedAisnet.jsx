import React from "react";
import AuthAisnet from "../../utils/AuthAisnet";
import Layout from "../../pages/admin/layouts/Layout";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedAisnet() {
  if (AuthAisnet.isAuthorization()) {
    return <Navigate to="/admin/list-students" />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
