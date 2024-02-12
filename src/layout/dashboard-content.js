import React from "react";
import Header from "./dashboard-header";
import { Outlet } from "react-router-dom";

function DashboardContent() {
  return (
    <div>
      <Header />
      <div className="pt-20 gray-bg">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardContent;
