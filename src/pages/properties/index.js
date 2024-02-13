import React from "react";
import { properties, low_investment } from "../../utils/data";
import PropertyCell from "./property-cell";
import Heading from "../../components/heading";
import Info from "../../components/info";

function Properties() {
  document.title = "Residences | Pieme";
  return (
    <div className="mx-auto container-box py-14">
      <Heading
        title="Available residences for investment"
        description={`The easy to use, hassle-free way to build a global hotel room portfolio
        from as little as ${low_investment}`}
      />
      <div className="grid gap-6 mt-16 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property, i) => (
          <PropertyCell key={i} property={property} />
        ))}
      </div>

      <Info
        desc="The value of any investment can decrease as well as increase due to
        market fluctuations and other external factors. Forecasts are only
        estimates and are not reliable."
      />
    </div>
  );
}

export default Properties;
