import React from "react";
import bg from "../../assets/bg.png";
import TopContent from "./top-content";
import Numbers from "./numbers";
import StartPortfolio from "./start-portfolio";
import InPress from "./in-press";
import Investing from "./investing";
import Platform from "./platform";
import Insights from "./insights";

function Home() {
  document.title = "Real Estate Investment";
  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="bg-white bg-top bg-no-repeat"
    >
      <TopContent />

      <Numbers />

      <StartPortfolio />

      <InPress />

      <Investing />

      <Platform />

      <Insights />
    </div>
  );
}

export default Home;
