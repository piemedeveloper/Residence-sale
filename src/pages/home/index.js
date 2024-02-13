import React from "react";
import bg from "../../assets/bg.png";
import TopContent from "./top-content";
import Numbers from "./numbers";
import StartPortfolio from "./start-portfolio";
// import InPress from "./in-press";
import Investing from "./investing";
import Platform from "./platform";
import Insights from "./insights";
import CalculateInvestment from "./calculate-investment";
import Faq from "../faq";

function Home() {
  document.title = "hotel room Investment";
  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="bg-white bg-top bg-no-repeat"
    >
      <TopContent />

      <Numbers />

      <StartPortfolio />

      <CalculateInvestment />

      <Investing />

      <Platform />

      <Insights />

      <Faq />
    </div>
  );
}

export default Home;
