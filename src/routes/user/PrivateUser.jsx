import React from "react";
import AuthUser from "../../utils/AuthUser";
import Layout from "../../pages/user/layouts/Layout";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateUser() {
  if (!AuthUser.isAuthorization()) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
