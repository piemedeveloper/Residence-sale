import React from "react";
import Header from "./header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Summary from "../pages/summary";
import Properties from "../pages/properties";
import PropertyDetail from "../pages/properties/property-detail";
import PropertyInvest from "../pages/properties/property-invest";
import Rewards from "../pages/rewards";
import Documents from "../pages/documents";
import Investments from "../pages/investments";

function Content() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className="pt-20">
          <Routes>
            <Route path="" element={<Summary />} />
            <Route path="summary" element={<Summary />} />
            <Route path="properties" element={<Properties />} />
            <Route path="properties/:id" element={<PropertyDetail />} />
            <Route path="properties/:id/invest" element={<PropertyInvest />} />
            <Route path="rewards" element={<Rewards />} />
            <Route path="documents" element={<Documents />} />
            <Route path="investments" element={<Investments />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default Content;
