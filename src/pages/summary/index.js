import React from "react";
import Info from "../../components/info";
import { numberFormatter } from "../../utils/utils";
import residence from "../../assets/images/residences.jpeg";
import SummaryContainer from "../../components/summary-container";
import postData from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import { user } from "../../features";

import { MdOutlinePayments, MdOutlinePayment, MdOutlinePaid } from "react-icons/md";
import { PiKeyReturn } from "react-icons/pi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { RiFundsBoxLine } from "react-icons/ri";
import { HiOutlineWallet } from "react-icons/hi2";
import { BsHouseCheck } from "react-icons/bs";
import { CiCreditCardOff } from "react-icons/ci";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

function Summary() {
  document.title = "Summary | Pieme";
  const userData = useSelector(user.user);


  const [summary, setsummary] = React.useState({});
  const [commitment, setCommitment] = React.useState({ unit_id: "", commited: 0, invested: 0 });

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

    postData({
      service: "commitment_balance",
      data: { unit_id: 0 },
    }).then((data) => {
      if (data.success !== 1) { } else {
        let commited = 0
        let invested = 0

        let unit_id = ""
        data.data.map((u) => {
          commited += u.amount
          invested += u.invested
          unit_id = u.enc_id
        })

        data.unit.map((u) => {
          // balance += u.amount - u.invested
          // commit_id = u.id
        })
        setCommitment({ unit_id, commited, invested })
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
      icon: <CiCreditCardOff />,
      title: "Total Commitment",
      color: "red",
      link: "/dashboard/residences/invest/" + commitment.unit_id,
      amount: "$" + numberFormatter(commitment.commited),
    },
    {
      icon: <MdOutlinePaid />,
      title: "Commitement fulfilled",
      color: "green",
      amount: "$" + numberFormatter(commitment.invested),
    },
    {
      icon: <PiKeyReturn />,
      title: "Total Returns",
      amount: 0,
    },
    {
      icon: <BsHouseCheck />,
      title: "Annual rental yield",
      amount: 0,
    },
  ];

  return (
    <div className="container mx-auto">
      <h2 className="mb-3 font-medium ms-2">Your Portfolio</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {portfolio.map((p, i) => (
          <div key={i}>
            {p.link !== undefined ? <Link to={p.link}>
              <div
                className="flex items-center gap-4 p-4 overflow-hidden bg-white border rounded-lg"
              >
                <div
                  style={{ backgroundColor: p.color }}
                  className="p-2 text-2xl text-white rounded-full main-light-bg">
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
            </Link> :
              <div
                className="flex items-center gap-4 p-4 overflow-hidden bg-white border rounded-lg"
              >
                <div
                  style={{ backgroundColor: p.color }}
                  className="p-2 text-2xl text-white rounded-full main-light-bg">
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
            }
          </div>

        ))}
      </div>

      <h2 className="mt-4 mb-3 font-medium ms-2">Funds</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
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
