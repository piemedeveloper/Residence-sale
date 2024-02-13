import React from "react";
import Slider from "./slider";

function About() {
  const about = [
    "Pieme is a hotel room crowdfunding platform designed to make investing in institutional grade investment residences around the world simple, accessible and instant.",
    "Pieme was set up with a clear mission: To disrupt the traditional way of investing in property, previously reserved for High Net Worth and institutional investors, giving Pieme investors easy and direct access to property-backed investments with attractive potential returns.",
    "The state-of-the-art investment platform allows instant access across every time zone. The clear and simple dashboard display allows investors to view, monitor and manage their investment portfolio wherever they are in the world, from the palm of their hand. ",
    "Behind our investment platform is a specialist team of property professionals searching the globe selecting investment opportunities.  Our expert team undertake strict due diligence and navigate complex legal and administrative undertakings in order to create a bespoke selection of residences for investors to choose from.",
    "Pieme now serves over two-thousand users worldwide, offering access to secure asset-backed investments into secure hotel room opportunities across the world's strongest currencies. ",
    "Welcome to Pieme: Global hotel room investing. Backed by bricks and mortar.",
  ];
  return (
    <div>
      <div className="max-w-3xl px-2 py-12 mx-auto text-center heading-color">
        <h1 className="text-5xl font-semibold">About Pieme</h1>
        <p className="mt-3 text-lg">
          With experts from Latin America, the US and Europe, we are a
          world-class team of property experts, finance geeks, fintech gurus and
          entrepreneurs. Our collective knowledge and experience span multiple
          geographies, decades and sectors.
        </p>
      </div>

      <div className="px-2 py-12 gradient-bg">
        <Slider />
      </div>

      <div className="container py-10 mx-auto">
        {about.map((d, i) => (
          <p key={i} className="mt-6 text-lg menu-color">
            {d}
          </p>
        ))}
      </div>
    </div>
  );
}

export default About;
