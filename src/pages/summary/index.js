import React from "react";
import Heading from "../../components/heading";
import Info from "../../components/info";
import ContentHeading from "../../components/content-heading";
import { Tooltip } from "antd";
import _ from "lodash";
import { numberFormatter } from "../../utils/utils";
import residence from "../../assets/images/residences.jpeg";
// import residence1 from "../../assets/images/residence.jpeg";
import SummaryContainer from "../../components/summary-container";
// import GraphSection from "./graph-section";
import postData from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import { user } from "../../features";

import { MdOutlinePayments, MdOutlinePayment } from "react-icons/md";
import { PiKeyReturn } from "react-icons/pi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { RiFundsBoxLine } from "react-icons/ri";
import { HiOutlineWallet } from "react-icons/hi2";
import { BsHouseCheck } from "react-icons/bs";
import logo from "../../assets/images/logo.png";

function Summary() {
  document.title = "Summary | Pieme";
  const userData = useSelector(user.user);

  const [summary, setsummary] = React.useState({});

  const funds = [
    {
      icon: <HiOutlineWallet />,
      title: "Available funds in wallet",
      color: "green",
      amount: 0,
    },
    {
      icon: <RiFundsBoxLine />,
      title: "Total re-invested",
      color: "#036eb8",
      amount: 0,
    },
    {
      icon: <BiMoneyWithdraw />,
      title: "Total withdrawn",
      color: "orange",
      amount: 0,
    },
    {
      icon: <img src={logo} alt="PIE" className="object-cover w-6 h-6" />,
      title: "PIE",
      color: "#036eb8",
      amount:
        Object.keys(summary).length > 0 ? numberFormatter(summary.pie) : 0,
    },
  ];

  React.useEffect(() => {
    postData({
      service: "dashboard_summary",
      data: {},
    }).then((data) => {
      if (data.success === 1) {
        setsummary({ ...data.data });
      }
    });
  }, []);

  const portfolio = [
    {
      icon: <MdOutlinePayment />,
      title: "Current investments",
      amount: Object.keys(summary).length > 0 ? summary.current_investment : 0,
    },
    {
      icon: <MdOutlinePayments />,
      title: "Total amount invested",
      amount:
        Object.keys(summary).length > 0
          ? "$" + numberFormatter(summary.total_investment)
          : 0,
    },
    {
      icon: <PiKeyReturn />,
      title: "Total Returns",
      tip: "The sum of all rental returns plus appreciation your portfolio has generated to date",
      amount: 0,
    },
    {
      icon: <BsHouseCheck />,
      title: "Annual rental yield",
      tip: "What your portfolio has generated per year as a percentage of your total invested capital",
      amount: 0,
    },
  ];

  return (
    <div className="mx-auto container-box">
      <h2 className="mb-3 font-medium ms-2">Your Portfolio</h2>
      <div className="grid grid-cols-4 gap-6">
        {portfolio.map((p, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 overflow-hidden bg-white border rounded-lg"
          >
            <div className="p-2 text-2xl text-white rounded-full main-light-bg">
              {p.icon}
            </div>
            <div>
              <p className="text-sm font-medium whitespace-pre-line head-color">
                {p.title}
              </p>
              <p className="mt-1 text-lg font-bold whitespace-pre-line head-color">
                {p.amount}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-4 mb-3 font-medium ms-2">Funds</h2>
      <div className="grid grid-cols-4 gap-6">
        {funds.map((p, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 overflow-hidden bg-white border rounded-lg"
          >
            <div
              className="p-2 text-2xl text-white rounded-full"
              style={{ backgroundColor: p.color }}
            >
              {p.icon}
            </div>
            <div>
              <p className="text-sm font-medium whitespace-pre-line head-color">
                {p.title}
              </p>
              <p className="mt-1 text-lg font-bold whitespace-pre-line head-color">
                {p.amount}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* <Heading title="Summary" description="" />
      <br /> */}

      <Info desc="The income generated in Pieme Residences fluctuates depending on the season, similar to how the value of any investment can decrease as well as increase due to market fluctuations and other external factors. Forecasts regarding the income are only estimates and are not reliable." />

      <SummaryContainer
        bg={residence}
        title={`${userData.first_name}, don't miss out on the current available opportunities`}
        link="/dashboard/residences"
        label="View available opportunities"
      />

      {/* <GraphSection /> */}

      {/* <SummaryContainer
        bg={residence1}
        title="Refer a friend! If they invest, you both earn a reward!"
        link="rewards"
        label="Refer a friend"
      /> */}
    </div>
  );
}

export default Summary;
