import React from "react";
import { Outlet } from "react-router-dom";
import LandingHeader from "./landing_header";
import Footer from "./footer";

function LandingContent() {
  return (
    <div>
      <LandingHeader />
      <Outlet />
      <Footer />
    </div>
  );
}

export default LandingContent;
