import React from "react";

import { Collapse } from "antd";
import {
  Differences,
  Disadvanges,
  HowItWorks,
  WhatIs,
  WhyConsider,
} from "./data-content";

function FaqData() {
  const items = [
    {
      key: "1",
      label:
        "I can afford to build an entire hotel alone” Why you should consider investing in Pieme Residences",
      children: <WhyConsider />,
    },
    {
      key: "2",
      label: "How do Pieme residences work",
      children: <HowItWorks />,
    },
    {
      key: "3",
      label:
        "What are the Disadvantages of investing in community-owned Hotels",
      children: <Disadvanges />,
    },
    {
      key: "4",
      label:
        "Difference Between Community Owned Hotel and Other traditional ownership Models",
      children: <Differences />,
    },
    {
      key: "5",
      label: "What is Hotel Community ownership",
      children: <WhatIs />,
    },
  ];
  return (
    <div className="pb-10 gray-bg">
      <div className="container mx-auto">
        <h1 className="pt-10 pb-6 text-5xl font-medium text-center main-color">
          Frequently asked questions
        </h1>

        <div className="max-w-4xl mx-auto">
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

export default FaqData;
