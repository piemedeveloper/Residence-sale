import React from "react";
import { Link } from "react-router-dom";
import { properties } from "../../utils/data";
import HomePropertyCell from "../home/home-property-cell";

function LandingProperties() {
  return (
    <div>
      <div className="max-w-3xl text-center mx-auto px-2 py-12 heading-color">
        <h1 className="text-5xl font-semibold">Our Investment Properties</h1>
        <p className="text-lg mt-4">
          <Link to="/login">
            <span className="main-color font-medium">Login</span>
          </Link>{" "}
          or{" "}
          <Link to="/signup">
            <span className="main-color font-medium">register</span>
          </Link>{" "}
          to view full portfolio of properties available
        </p>
      </div>

      <div className="pb-16 container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-3">
        {properties.map((property, i) => (
          <HomePropertyCell key={i} property={property} />
        ))}
      </div>
    </div>
  );
}

export default LandingProperties;
