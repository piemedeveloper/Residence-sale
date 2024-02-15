import React from "react";
import Heading from "../../components/heading";
import { Collapse } from "antd";
import {
  FaSquareFacebook,
  FaSquareXTwitter,
  FaLinkedin,
} from "react-icons/fa6";
import { FriendReferrer, General, Referrers, Reward } from "./data-content";
// import Referrrals from "./referrrals";
import ContentHeading from "../../components/content-heading";

function Rewards({ user }) {
  document.title = "Rewards | Pieme";
  const icon_class = "text-3xl";

  const items = [
    {
      key: "1",
      label: "Rewards",
      children: <Reward />,
    },
    {
      key: "2",
      label: "Referrers",
      children: <Referrers />,
    },
    {
      key: "3",
      label: "Friend / referrer",
      children: <FriendReferrer />,
    },
    {
      key: "4",
      label: "General",
      children: <General />,
    },
  ];

  return (
    <div className="mx-auto container-box py-14">
      <Heading
        title="My rewards & bonuses"
        description="Give your code to friends when referring Pieme and when they invest you will both receive a cash reward"
      />

      <div className="flex flex-col gap-6 mt-16 md:flex-row">
        <div className="w-full bg-white md:w-1/3 rounded-xl">
          <ContentHeading title="my referral code" />
          <div className="py-12">
            <p className="text-2xl font-medium text-center md:text-3xl main-color">
              {user.enc_id}
            </p>
          </div>
        </div>
        <div className="w-full bg-white md:w-2/3 rounded-xl">
          <ContentHeading title="share my code" />
          <div className="p-6">
            <div className="flex items-center overflow-hidden share-bg rounded-xl">
              <p className="w-full px-6 text-base head-color line-clamp-1">
                {window.location.origin}?referrer={user.enc_id}
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

      <h2 className="mt-10 text-3xl font-medium main-color">
        How does it work?
      </h2>
      <Collapse
        accordion
        items={items}
        expandIconPosition="end"
        className="mt-6"
        bordered={false}
      />

      {/* <Referrrals /> */}
    </div>
  );
}

export default Rewards;
