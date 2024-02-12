import React from "react";
import LandingHeader from "./landing_header";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/home";
import Faq from "../pages/faq";
import Footer from "./footer";
import About from "../pages/about";
import Login from "../pages/welcome/login";
import Register from "../pages/welcome/register";
import LandingProperties from "../pages/properties/landing-properties";
import HowItWorks from "../pages/how-it-works";
import Team from "../pages/team";
import DashboardContent from "./dashboard-content";

import Properties from "../pages/properties";
import Rewards from "../pages/rewards";
import Documents from "../pages/documents";
import Investments from "../pages/investments";
import PropertyDetail from "../pages/properties/property-detail";
import PropertyInvest from "../pages/properties/property-invest";
import Summary from "../pages/summary";
import HowItWorksDetails from "../pages/how-it-works/how-it-works-details";

function LandingContent() {
  const location = useLocation();
  const url = location.pathname.substring(1).split("/")[0];
  return (
    <div className="bg-white">
      {url !== "dashboard" && <LandingHeader />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/properties" element={<LandingProperties />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/team" element={<Team />} />
        <Route path="/dashboard" element={<DashboardContent />}>
          <Route path="" element={<Summary />} />
          <Route path="properties" element={<Properties />} />
          <Route path="properties/:id" element={<PropertyDetail />} />
          <Route path="properties/:id/invest" element={<PropertyInvest />} />
          <Route path="rewards" element={<Rewards />} />
          <Route path="documents" element={<Documents />} />
          <Route path="investments" element={<Investments />} />
        </Route>
        {/* <Route path="/dashboard/:id" element={<DashboardContent />} />
        <Route path="/dashboard/:id/:id" element={<DashboardContent />} /> */}
        <Route path="/:id" element={<HowItWorksDetails />} />
        <Route path="*" element={<Home />} />
      </Routes>
      {url !== "dashboard" && <Footer />}
    </div>
  );
}

export default LandingContent;
