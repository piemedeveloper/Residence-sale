import React from "react";
import Heading from "../../components/heading";
import {
  FaSquareFacebook,
  FaSquareXTwitter,
  FaLinkedin,
} from "react-icons/fa6";
import ContentHeading from "../../components/content-heading";

function Rewards({ user }) {
  document.title = "Rewards | Pieme";
  const icon_class = "text-3xl";

  return (
    <div className="container mx-auto">
      <Heading
        title="My rewards & bonuses"
        description="Give your code to friends when referring Pieme and when they invest you will both receive a cash reward"
      />

      <div className="flex flex-col gap-6 mt-16 md:flex-row">
        <div className="w-full bg-white md:w-1/3 rounded-xl">
          <ContentHeading title="my referral code" />
          <div className="py-12">
            <p className="text-2xl font-medium text-center uppercase md:text-3xl main-color">
              {user.code}
            </p>
          </div>
        </div>
        <div className="w-full bg-white md:w-2/3 rounded-xl">
          <ContentHeading title="share my code" />
          <div className="p-6">
            <div className="flex items-center overflow-hidden share-bg rounded-xl">
              <p className="w-full px-6 text-base head-color line-clamp-1">
                {window.location.origin}?referrer=
                <span className="uppercase">{user.code}</span>
              </p>
              <button className="px-10 py-3.5 main-bg text-white text-base">
                Copy
              </button>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <p className="text-base">Share via:</p>
              <FaSquareFacebook
                className={`${icon_class}`}
                style={{ color: "#1973eb" }}
              />
              <FaSquareXTwitter className={`${icon_class}`} />
              <FaLinkedin
                className={`${icon_class}`}
                style={{ color: "#0273b1" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rewards;
