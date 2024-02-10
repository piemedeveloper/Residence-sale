import React from "react";
import platform from "../../assets/platform.png";
import { Link } from "react-router-dom";
import { TiTick } from "react-icons/ti";

function Platform() {
  const platform_b = [
    "Clear portfolio dashboard display",
    "Early-access investment opportunities",
    "Regular insights, research and trends",
    "Property and investment updates",
    "Referral reward scheme",
  ];
  return (
    <div>
      <div className="container relative mx-auto">
        <div
          className="grid p-8 text-base bg-white md:text-lg gap-x-8 gap-y-4 lg:grid-cols-2 rounded-xl"
          style={{ marginTop: "-3rem" }}
        >
          <p>
            We are property people at heart. Behind our state-of-the-art
            investment platform is a specialist team of real estate
            professionals searching the globe to identify exclusive investment
            opportunities. Our expert team undertake a rigorous due diligence
            process when selecting investment opportunities for you.
          </p>
          <p>
            We navigate and manage the complex legal and administrative
            undertakings to create a bespoke selection of properties to choose
            from. Allowing our investors to curate an internationally
            diversified real estate portfolio from the palm of their hand with
            the knowledge that the hard work is already done.
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
                <h3 className="text-3xl md:text-[2.8rem] font-medium">
                  A real estate investment platform built for you
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
                  <Link>
                    <p className="mt-20 text-center register-btn">
                      Register to view full property details
                    </p>
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
