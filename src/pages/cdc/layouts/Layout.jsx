import React from "react";
import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <TopBar />
      <Outlet />
    </div>
  );
}
