import React from "react";
import bg from "../../assets/images/bg.png";
import TopContent from "./top-content";
import Numbers from "./numbers";
import StartPortfolio from "./start-portfolio";
// import InPress from "./in-press";
import Investing from "./investing";
import Platform from "./platform";
import Insights from "./insights";
import CalculateInvestment from "./calculate-investment";
import FaqData from "../faq/faq-data";

function Home() {
  document.title = "Hotel Room Investment";
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

      <FaqData />
    </div>
  );
}

export default Home;
