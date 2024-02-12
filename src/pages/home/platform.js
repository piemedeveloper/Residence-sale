import React from "react";
import platform from "../../assets/platform.png";
import { Link } from "react-router-dom";
import { TiTick } from "react-icons/ti";

function Platform() {
  const platform_b = [
    "Portfolio Platform Dashboard",
    "Investment Opportunities in Different Pieme Residences",
    "Development updates Per unit and whole residence",
    "Management and Booking Updates",
    "Guest Hotel booking in Pieme Residences",
    "Food ordering in Pieme Residential Restaurants",
    "Referral rewards",
  ];
  return (
    <div>
      <div className="container relative mx-auto">
        <div
          className="grid p-8 text-base bg-white md:text-lg gap-x-8 gap-y-4 lg:grid-cols-2 rounded-xl"
          style={{ marginTop: "-3rem" }}
        >
          <p>
            The Pieme platform is a revolutionary system that enables
            individuals to invest in hotel ownership through blockchain-powered
            community-owned apartments. It simplifies hotel investment by
            handling management tasks, allowing investors to earn revenue from
            nightly bookings without the hassle of traditional hotel management.
          </p>
          <p>
            Invest in Pieme Residences now for easy hotel ownership in Africa.
            Earn 70% booking revenue hassle-free with blockchain. Join the
            digital transformation trend and tap into lucrative hospitality
            opportunities.
          </p>
        </div>
      </div>

      <div
        className="pb-20 mt-3 platform-container"
        style={{ backgroundImage: `url(${platform})` }}
      >
        <div className="container mx-auto">
          <div className="flex px-4 pt-6 heading-color ">
            <div className="md:w-2/5"></div>
            <div className="w-full md:w-3/5">
              <div className="md:max-w-2xl">
                <h3 className="text-3xl md:text-[2.8rem] font-medium leading-snug">
                  A Hotel investment platform created For you
                </h3>

                <div className="mt-8">
                  {platform_b.map((p, i) => (
                    <div key={i} className="flex items-center gap-3 mt-4">
                      <div className="p-1 rounded-full invest-input">
                        <TiTick className="text-2xl heading-color" />
                      </div>
                      <p className="text-base md:text-lg">{p}</p>
                    </div>
                  ))}
                </div>

                <div className="flex mt-10">
                  <Link to="/login">
                    <p className="mt-20 text-center register-btn">Invest Now</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Platform;
