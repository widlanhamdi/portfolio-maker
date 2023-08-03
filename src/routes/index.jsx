import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// admin
import DashboardAdmin from "../pages/admin";
import LoginAdmin from "../pages/admin/authentication/LoginAdmin";
import PrivateAdmin from "./admin/PrivateAdmin";
import ProtectedAdmin from "./admin/ProtectedAdmin";

// Aisnet
import ListStudents from "../pages/admin/components/ListStudents";
import LoginAisnet from "../pages/admin/authentication/LoginAisnet";
import PrivateAisnet from "./aisnet/PrivateAisnet";
import ProtectedAisnet from "./aisnet/ProtectedAisnet";

// cdc
import DashboardCDC from "../pages/cdc";
import LoginCDC from "../pages/cdc/authentication/LoginCDC";
import PrivateCDC from "./cdc/PrivateCDC";
import ProtectedCDC from "./cdc/ProtectedCDC";

// user
import CreatePortofolio from "../pages/user/CreatePortfolio";
import EditPortfolio from "../pages/user/EditPortfolio";
import LandingPage from "../pages/user/LandingPage";
import Login from "../pages/user/authentication/Login";
import Profile from "../pages/user/Profile";
import PrivateUser from "./user/PrivateUser";
import ProtectedUser from "./user/ProtectedUser";
import ResetPassword from "../pages/user/authentication/ResetPassword";
import ListAlumni from "../pages/admin/components/ListAlumni";
import PublishPortfolio from "../components/PublishPortfolio";
import NotFound from "../pages/NotFound";

export default function SetupRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin */}

        <Route path="/admin" element={<ProtectedAdmin />}>
          <Route path="login" element={<LoginAdmin />} />
        </Route>

        <Route path="/admin" element={<PrivateAdmin />}>
          <Route index element={<DashboardAdmin />} />
          <Route path="register-alumni" element={<ListAlumni />} />
        </Route>

        {/* Aisnet */}

        <Route path="/admin" element={<ProtectedAisnet />}>
          <Route path="login-students" element={<LoginAisnet />} />
        </Route>

        <Route path="/admin" element={<PrivateAisnet />}>
          <Route path="list-students" element={<ListStudents />} />
        </Route>

        {/* CDC */}

        <Route path="/cdc" element={<ProtectedCDC />}>
          <Route path="login" element={<LoginCDC />} />
        </Route>

        <Route path="/cdc" element={<PrivateCDC />}>
          <Route index element={<DashboardCDC />} />
        </Route>

        {/* User */}

        <Route path="/" element={<ProtectedUser />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        <Route path="/" element={<PrivateUser />}>
          <Route path="profile" element={<Profile />} />
          <Route path="edit-portfolio" element={<EditPortfolio />} />
          <Route path="create-portfolio" element={<CreatePortofolio />} />
        </Route>

        {/* Public */}

        <Route path="/portfolio/:id" element={<PublishPortfolio />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
