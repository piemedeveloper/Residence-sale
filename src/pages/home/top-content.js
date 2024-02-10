import React from "react";
import { Link } from "react-router-dom";
import { FaRegBuilding } from "react-icons/fa";
import { MdOutlineAttachMoney, MdPayment } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { Slide } from "react-awesome-reveal";

import _ from "lodash";
import Slider from "../about/slider";
import { low_investment } from "../../utils/data";

function TopContent() {
  const invest = [
    {
      icon: <FaRegBuilding className={`text-5xl heading-color`} />,
      label: "Select property",
    },
    {
      icon: <MdOutlineAttachMoney className={`text-5xl heading-color`} />,
      label: "Select Unit",
    },
    {
      icon: <MdPayment className={`text-5xl heading-color`} />,
      label: "Choose payment plan",
    },
    {
      icon: <GiReceiveMoney className={`text-5xl heading-color`} />,
      label: "Enjoy returns",
    },
  ];
  return (
    <div className="container p-6 mx-auto">
      <div className="flex">
        <Slide direction="left" triggerOnce>
          <div className="w-full px-6 py-10 pt-16">
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight heading-color">
              Real estate investment made easy
            </h1>
            <p className="my-6 text-lg heading-color">
              The easy to use, hassle-free way to build a global real estate
              portfolio from as little as {low_investment}
            </p>

            <div className="flex">
              <Link>
                <p className="md:text-base text-sm text-center register-btn">
                  Register to view full property details
                </p>
              </Link>
            </div>
          </div>
        </Slide>
        <div className="md:w-full"></div>
      </div>

      <div>
        <div className="mt-16">
          <Slider />
        </div>

        <div className="max-w-4xl mx-auto my-10">
          <h2 className="text-4xl font-medium text-center md:text-5xl heading-color">
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
            <Link>
              <p className="mt-20 text-center register-btn">
                Register to view full property details
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopContent;
