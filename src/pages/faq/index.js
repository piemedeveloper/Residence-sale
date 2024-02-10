import React from "react";
import { Collapse } from "antd";
import { FriendReferrer, General, Referrers, Reward } from "./data-content";

function Faq() {
  const items = [
    {
      key: "1",
      label: "About Pieme",
      children: <Reward />,
    },
    {
      key: "2",
      label: "My Investments",
      children: <Referrers />,
    },
    {
      key: "3",
      label: "My Portfolio",
      children: <FriendReferrer />,
    },
    {
      key: "4",
      label: "My Account",
      children: <General />,
    },
    {
      key: "5",
      label: "General Returns",
      children: <General />,
    },

    {
      key: "6",
      label: "Security",
      children: <General />,
    },
  ];
  return (
    <div className="pb-10 gray-bg">
      <div className="container mx-auto">
        <h1 className="pt-10 pb-6 text-5xl font-medium text-center main-color">
          Frequently asked questions
        </h1>

        <div className="max-w-3xl mx-auto">
          <Collapse
            accordion
            items={items}
            expandIconPosition="end"
            bordered={false}
          />
        </div>
      </div>
    </div>
  );
}

export default Faq;
