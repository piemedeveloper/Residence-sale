import React from "react";
import Heading from "../../components/heading";
import SummaryContainer from "../../components/summary-container";
import residence from "../../assets/residence.jpeg";
import Info from "../../components/info";

function Investments() {
  document.title = "Investments | Pieme";
  return (
    <div className="mx-auto my-14 container-box">
      <Heading title="Investments" description="" />
      <br />
      <SummaryContainer
        bg={residence}
        title="Kainja, don't miss out on the current available opportunities"
        link="properties"
        label="View availble opportunities"
      />

      <div className="bg-white rounded-xl">
        <Info desc="The value of any investment can decrease as well as increase due to market fluctuations and other external factors. Forecasts are only estimates and are not reliable." />
      </div>
    </div>
  );
}

export default Investments;
