import React from "react";

import { Collapse } from "antd";
import {
  FaqIndex1,
  FaqIndex2,
  FaqIndex3,
  FaqIndex4,
  FaqIndex5,
} from "./data-content";

function FaqData() {
  const items = [
    {
      key: "1",
      label:
        "I can afford to build an entire hotel alone” Why you should consider investing in Pieme Residences",
      children: <FaqIndex1 />,
    },
    {
      key: "2",
      label: "How do Pieme residences work",
      children: <FaqIndex2 />,
    },
    {
      key: "3",
      label:
        "What are the Disadvantages of investing in community-owned Hotels",
      children: <FaqIndex3 />,
    },
    {
      key: "4",
      label:
        "Difference Between Community Owned Hotel and Other traditional ownership Models",
      children: <FaqIndex4 />,
    },
    {
      key: "5",
      label: "What is Hotel Community ownership",
      children: <FaqIndex5 />,
    },
  ];
  return (
    <div className="pb-10 gray-bg">
      <div className="container mx-auto">
        <h1 className="pt-10 pb-6 text-5xl font-medium text-center heading-color">
          Frequently asked questions
        </h1>

        <div className="max-w-4xl mx-auto">
          <Collapse
            accordion
            items={items}
            defaultActiveKey={["1"]}
            expandIconPosition="end"
            bordered={false}
          />
        </div>
      </div>
    </div>
  );
}

export default FaqData;
