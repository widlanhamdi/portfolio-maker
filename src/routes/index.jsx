import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// admin
import DashboardAdmin from "../pages/admin";
import PrivateAdmin from "./admin/PrivateAdmin";

// Aisnet
import ListStudents from "../pages/admin/components/ListStudents";
import LoginAisnet from "../pages/admin/authentication/LoginAisnet";
import PrivateAisnet from "./aisnet/PrivateAisnet";
import ProtectedAisnet from "./aisnet/ProtectedAisnet";

// cdc
import DashboardCDC from "../pages/cdc";
import PrivateCDC from "./cdc/PrivateCDC";

// user
import CreatePortofolio from "../pages/user/CreatePortfolio";
import EditPortfolio from "../pages/user/EditPortfolio";
import LandingPage from "../pages/user/LandingPage";
import ListAlumni from "../pages/admin/components/ListAlumni";
import ListPortfolio from "../pages/user/ListPortfolio";
import Login from "../pages/user/authentication/Login";
import NotFound from "../pages/NotFound";
import Profile from "../pages/user/Profile";
import PrivateUser from "./user/PrivateUser";
import ProtectedUser from "./user/ProtectedUser";
import PublishPortfolio from "../components/PublishPortfolio";
import ResetPassword from "../pages/user/authentication/ResetPassword";

export default function SetupRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin */}

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

        <Route path="/cdc" element={<PrivateCDC />}>
          <Route index element={<DashboardCDC />} />
        </Route>

        {/* User */}

        <Route path="/" element={<ProtectedUser />}>
          <Route index element={<LandingPage />} />
          <Route path="list-portfolio" element={<ListPortfolio />} />
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
