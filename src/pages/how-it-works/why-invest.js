import React from "react";
import why_invest from "../../assets/why-invest.png";
import Slider from "../about/slider";
import { Link } from "react-router-dom";
import jei from "../../assets/jei.jpeg";
import lydia from "../../assets/lydia.jpeg";

function WhyInvest() {
  const testimonials = [
    {
      photo: jei,
      message:
        "Pieme takes care of everything tedious about hotel room investment: formalities, insurance, maintenance, tenants, etc. The variety of residences allows diversification which gives me greater peace of mind. The process is really simple - you can keep track of your investments anytime, anywhere.",
      name: "Jei Rahman",
    },

    {
      photo: lydia,
      message:
        "I've been impressed with Pieme from the very beginning. The investing process was made clear and simple through the website and there is always excellent support available. I strongly recommend them.",
      name: "Asiimwe Lydia",
    },
  ];

  return (
    <div className="py-16 gradient-bg">
      <div
        className="pb-2 bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${why_invest})`,
        }}
      >
        <div className="max-w-2xl mx-auto mb-6 text-center text-white">
          <h2 className="text-4xl font-semibold">Why invest with Pieme?</h2>
          <p className="mt-3 text-lg">
            The Pieme platform is a revolutionary system that enables
            individuals to invest in hotel ownership through blockchain-powered
            community-owned apartments. It simplifies hotel investment by
            handling management tasks, allowing investors to earn revenue from
            nightly bookings without the hassle of traditional hotel management.
          </p>
        </div>

        <Slider />

        <div className="flex justify-center mt-6 mb-10">
          <Link to="/signup">
            <p className="mt-20 text-center register-btn">Register</p>
          </Link>
        </div>
      </div>

      <div className="container relative grid gap-8 mx-auto lg:grid-cols-2">
        {testimonials.map((t, i) => (
          <div key={i} className="flex gap-4 p-6 bg-white rounded-xl">
            <img
              src={t.photo}
              alt="investing"
              className="w-16 h-16 rounded-full min-w-16"
            />
            <div>
              <p className="text-base">"{t.message}"</p>
              <p className="mt-2 text-base">{t.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhyInvest;
