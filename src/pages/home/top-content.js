import React from "react";
import { Link } from "react-router-dom";
import { FaRegBuilding } from "react-icons/fa";
import { MdOutlineAttachMoney, MdPayment } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { Slide } from "react-awesome-reveal";
import { IoCartOutline } from "react-icons/io5";

import _ from "lodash";
import Slider from "../about/slider";
import { low_investment } from "../../utils/data";

function TopContent() {
  const invest = [
    {
      icon: <FaRegBuilding className={`text-5xl heading-color`} />,
      label: "Select Hotel Residence",
    },
    {
      icon: <MdOutlineAttachMoney className={`text-5xl heading-color`} />,
      label: "Select Unit",
    },
    {
      icon: <MdPayment className={`text-5xl heading-color`} />,
      label: "Invest now",
    },
    {
      icon: <GiReceiveMoney className={`text-5xl heading-color`} />,
      label: "Enjoy returns",
    },
  ];
  return (
    <div className="container p-2 mx-auto mt-2">
      <div className="flex max-w-2xl">
        <Slide direction="left" triggerOnce>
          <div className="px-6 py-10 pt-16 ">
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl heading-color">
              Investment in the Hotel Business Made Easy
            </h1>
            <p className="my-6 text-lg heading-color">
              The easy, hassle-free way to build a Hotel Empire from as little
              as {low_investment}
            </p>

            <div className="flex">
              <a href="https://app.pieme.info">
                <p className="text-base invest-now">Invest Now</p>
              </a>
            </div>
          </div>
        </Slide>
        {/* <div className="md:w-full"></div> */}
      </div>

      <div>
        <div className="relative mt-16">
          <Slider />
          <div className="absolute px-16 py-8 text-center text-white transform -translate-x-1/2 -translate-y-1/2 rounded-md top-1/2 left-1/2 main-light-bg">
            <p className="font-medium text:2xl lg:text-3xl">Marketplace is now Open</p>
            <p className="mt-5 text-lg">Pre-register now</p>
            <a href="https://app.pieme.info"><p className="flex items-center justify-center gap-3 p-3 mt-3 bg-white rounded-sm border-1 main-color"><IoCartOutline className="text-2xl" />Visit our Marketplace</p></a>
          </div>
        </div>

        <div className="max-w-4xl mx-auto my-14">
          <h2 className="text-3xl font-semibold text-center md:text-4xl heading-color">
            Hotel Investment Opportunity Generating Superior Returns
          </h2>

          <div className="grid max-w-4xl gap-3 mx-auto sm:grid-cols-4">
            {_.map(invest, (i, l) => (
              <div key={l}>
                <div className="flex justify-center mt-12">
                  <div className="rounded-full p-11 invest-input">{i.icon}</div>
                </div>
                <p className="mt-4 text-lg text-center heading-color">
                  {l + 1}. {i.label}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <a href="https://app.pieme.info">
              <p className="mt-20 invest-now">Invest Now</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopContent;
