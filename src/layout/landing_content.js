import React from "react";
import LandingHeader from "./landing_header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Faq from "../pages/faq";
import Footer from "./footer";
import About from "../pages/about";
import Login from "../pages/welcome/login";
import Register from "../pages/welcome/register";
import LandingProperties from "../pages/properties/landing-properties";
import HowItWorks from "../pages/how-it-works";
import Team from "../pages/team";

function LandingContent() {
  return (
    <div className="bg-white">
      <BrowserRouter>
        <LandingHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/properties" element={<LandingProperties />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/team" element={<Team />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default LandingContent;
