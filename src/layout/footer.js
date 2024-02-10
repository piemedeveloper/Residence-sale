import React from "react";
import { Link } from "react-router-dom";
import { low_investment } from "../utils/data";

function Footer() {
  const menus = [
    { menu: "Privacy Policy", url: "" },
    { menu: "Terms & Conditions", url: "" },
    { menu: "About Pieme", url: "" },
    { menu: "Risk Warnings", url: "" },
    { menu: "Properties", url: "" },
    { menu: "Contact us", url: "" },
    { menu: "Deals", url: "" },
    { menu: "Sitemap", url: "" },
    { menu: "Press", url: "" },
  ];

  return (
    <div className="text-sm gradient-bg">
      <div className="container flex md:flex-row flex-col gap-10 py-16 mx-auto border-b-[0.2px]">
        <div className="w-full md:w-1/4">
          <h3 className="text-base heading-color">Quick Links</h3>

          <div className="mt-6 text-white">
            {menus.map((m, i) => (
              <Link key={i}>
                <p className="mt-2">{m.menu}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <h3 className="text-base heading-color">About Pieme</h3>

          <div className="mt-6 text-white">
            <p>
              Pieme is a state-of-the-art crowdfunding platform providing direct
              access to secure, asset-backed investment opportunities
              hand-picked from across the globe. From as little as{" "}
              {low_investment}, you can create an internationally diversified
              real estate portfolio, from the palm of your hand.
            </p>

            <p className="mt-4">
              *The value of any investment can decrease, as well as, increase,
              due to market fluctuations and other external factors. Forecasts
              are only estimates and are not a reliable indicator of
              performance. There are important risk factors that must be
              considered before making an investment and all returns are subject
              to the performance of each individual property.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <h3 className="text-base heading-color">Connect with Pieme</h3>
          <div className="mt-6 text-white">
            <p>
              Pieme is the trading name of Diversified Real Estate Asset
              Management Ltd.
            </p>
          </div>
        </div>
      </div>

      <div>
        <p className="p-4 text-sm text-center text-white">
          Copyright Pieme 2024. All rights reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;
