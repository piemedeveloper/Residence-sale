import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const menus = [
    // { menu: "Privacy Policy", url: "" },
    { menu: "Terms & Conditions", url: "terms-and-conditions" },
    { menu: "About Pieme", url: "about" },
    { menu: "Residences", url: "residences" },
    { menu: "Contact us", url: "contact" },
    // { menu: "Sitemap", url: "sitemap" },
  ];

  return (
    <div className="text-base gradient-bg">
      <div className="container flex md:flex-row flex-col gap-10 py-16 mx-auto border-b-[0.2px]">
        <div className="w-full md:w-1/4">
          <h3 className="text-base font-semibold text-white">Quick Links</h3>

          <div className="mt-6 text-white">
            {menus.map((m, i) => (
              <Link key={i} to={`/${m.url}`}>
                <p className="mt-2">{m.menu}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <h3 className="text-base font-semibold text-white">About Pieme</h3>

          <div className="mt-6 text-white">
            <p>
              The Pieme platform is a revolutionary system that enables
              individuals to invest in hotel ownership through
              blockchain-powered community-owned apartments. It simplifies hotel
              investment by handling management tasks, allowing investors to
              earn revenue from nightly bookings without the hassle of
              traditional hotel management.
            </p>

            <p className="mt-4"></p>
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <h3 className="text-base font-semibold text-white">
            Connect with Pieme
          </h3>
          <div className="mt-6 text-white">
            <p>
              Invest in Pieme Residences now for easy hotel ownership in Africa.
              Earn up to 70% booking revenue hassle-free with blockchain. Join
              the digital transformation trend and tap into lucrative
              hospitality opportunities.
            </p>
          </div>

          <a href="mailto:support@pieme.info"><p className="pt-3 text-white">support@pieme.info</p></a>
        </div>
      </div>

      <div>
        <p className="p-4 text-base text-center text-white">
          Copyright Pieme 2024. All rights reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;
