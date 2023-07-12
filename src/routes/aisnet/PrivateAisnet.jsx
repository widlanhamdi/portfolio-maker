import React from "react";
import Layout from "../../pages/admin/layouts/Layout";
import { Navigate, Outlet } from "react-router-dom";
import AuthAisnet from "../../utils/AuthAisnet";

export default function PrivateAisnet() {
  if (!AuthAisnet.isAuthorization()) {
    return <Navigate to="/admin/login-students" />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
