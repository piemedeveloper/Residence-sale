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
// import Team from "../pages/team";
import DashboardContent from "./dashboard-content";

import Properties from "../pages/properties";
import Rewards from "../pages/rewards";
import Documents from "../pages/documents";
import Investments from "../pages/investments";
import PropertyDetail from "../pages/properties/property-detail";
import PropertyInvest from "../pages/properties/property-invest";
import Summary from "../pages/summary";
import HowItWorksDetails from "../pages/how-it-works/how-it-works-details";
import LandingPropertyDetail from "../pages/properties/landing-property-detail";

import { useSelector, useDispatch } from "react-redux";
import { user, addUsers } from "../features";
import postData from "../hooks/useFetch";

function LandingContent() {
  const location = useLocation();
  const url = location.pathname.substring(1).split("/")[0];

  const userData = useSelector(user.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    postData({
      service: "get_profile",
      data: {},
    }).then((data) => {
      if (data.success === 1) dispatch(addUsers.user(data.data));
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="bg-white">
      {url !== "dashboard" && <LandingHeader />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/residences" element={<LandingProperties />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        {/* <Route path="/team" element={<Team />} /> */}

        {Object.keys(userData).length > 0 && (
          <Route
            path="/dashboard"
            element={<DashboardContent user={userData} />}
          >
            <Route path="" element={<Summary user={userData} />} />
            <Route path="residences" element={<Properties />} />
            <Route path="residences/:id" element={<PropertyDetail />} />
            <Route path="residences/:id/invest" element={<PropertyInvest />} />
            <Route path="rewards" element={<Rewards user={userData} />} />
            <Route path="documents" element={<Documents />} />
            <Route
              path="investments"
              element={<Investments user={userData} />}
            />
          </Route>
        )}

        {/* <Route path="/dashboard/:id" element={<DashboardContent />} />
        <Route path="/dashboard/:id/:id" element={<DashboardContent />} /> */}
        <Route path="residences/:id" element={<LandingPropertyDetail />} />
        <Route path="/:id" element={<HowItWorksDetails />} />
        <Route path="*" element={<Home />} />
      </Routes>
      {url !== "dashboard" && <Footer />}
    </div>
  );
}

export default LandingContent;
