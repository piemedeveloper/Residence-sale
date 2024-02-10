import React from "react";
import Heading from "../../components/heading";
import Info from "../../components/info";
import ContentHeading from "../../components/content-heading";
import { Tooltip } from "antd";
import _ from "lodash";
import { numberFormatter } from "../../utils/utils";
import residence from "../../assets/residence.png";
import residence1 from "../../assets/residence.jpeg";
import SummaryContainer from "../../components/summary-container";
import GraphSection from "./graph-section";

function Summary() {
  document.title = "Summary | Pieme";

  const investments = [
    {
      title: "Current \ninvestments",
      amount: 0,
    },
    {
      title: "Exited\ninvestments",
      amount: 0,
    },
    {
      title: "Total\ninvested",
      amount: 0,
    },
  ];

  const returns = [
    {
      title: "Total\nreturns",
      tip: "The sum of all rental returns plus appreciation your portfolio has generated to date",
      amount: 0,
    },
    {
      title: "Total\nrental returns",
      tip: "The sum of all net rental returns your portfolio has generated to date",
      amount: 0,
    },
    {
      title: "Average annual\nrental yield",
      tip: "What your portfolio has generated per year as a percentage of your total invested capital",
      amount: 0,
    },
  ];

  const funds = [
    {
      title: "Available\nfunds in wallet",
      color: "lightgreen",
      amount: 0,
    },
    {
      title: "Total\nre-invested",
      color: "#036eb8",
      amount: 0,
    },
    {
      title: "Total\nwithdrawn",
      color: "orange",
      amount: 0,
    },
  ];

  return (
    <div className="mx-auto my-14 container-box">
      <Heading title="Summary" description="" />
      <br />

      <Info desc="The value of any investment can decrease as well as increase due to market fluctuations and other external factors. Forecasts are only estimates and are not reliable." />

      <div className="flex flex-col w-full gap-6 md:flex-row">
        <div className="w-full bg-white rounded-xl">
          <ContentHeading title="YOUR PORTFOLIO" />
          <div className="grid grid-cols-2 gap-6 p-5 sm:grid-cols-3">
            {_.map(investments, (investment, i) => (
              <div key={i}>
                <p className="text-sm whitespace-pre-line head-color">
                  {investment.title}
                </p>
                <p className="text-xl font-semibold main-color">
                  {numberFormatter(investment.amount)}
                </p>
              </div>
            ))}
          </div>

          <div className="px-5 my-3">
            <div className="w-full h-4 rounded-full invest-input"></div>
          </div>

          <div className="grid grid-cols-2 gap-6 p-5 sm:grid-cols-3">
            {_.map(returns, (r, i) => (
              <div key={i}>
                <Tooltip placement="top" title={r.tip}>
                  <p className="text-sm underline whitespace-pre-line cursor-pointer head-color">
                    {r.title}
                  </p>
                </Tooltip>
                <p className="text-xl font-semibold main-color">{r.amount}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full bg-white rounded-xl">
          <ContentHeading title="FUNDS" />
          <div className="grid grid-cols-2 gap-6 p-5 sm:grid-cols-3">
            {_.map(funds, (f, i) => (
              <div key={i} className="flex gap-2">
                <div
                  style={{ backgroundColor: f.color }}
                  className="w-3 h-3 mt-1 rounded-full"
                ></div>
                <div>
                  <p className="text-sm whitespace-pre-line head-color">
                    {f.title}
                  </p>
                  <p className="text-xl font-semibold main-color">
                    ${numberFormatter(f.amount)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="px-5 my-3">
            <div className="w-full h-4 rounded-full invest-input"></div>
          </div>
        </div>
      </div>

      <SummaryContainer
        bg={residence}
        title="Kainja, don't miss out on the current available opportunities"
        link="properties"
        label="View available opportunities"
      />

      <GraphSection />

      <SummaryContainer
        bg={residence1}
        title="Refer a friend! If they invest, you both earn a reward!"
        link="rewards"
        label="Refer a friend"
      />
    </div>
  );
}

export default Summary;
