import React from "react";

import { Input } from "antd";
import { BsCalculator } from "react-icons/bs";
import { JackInTheBox } from "react-awesome-reveal";
import residence from "../../assets/images/residence.jpeg";

function CalculateInvestment() {
  const [data, setData] = React.useState({
    unit: 6500,
    booking: 200,
    days: 23,
    monthly: 0,
    annual: 0,
  });

  const calculate = () => {
    data.monthly = Math.ceil(data.booking * data.days * 0.7);
    data.annual = Math.ceil(data.booking * data.days * 0.7 * 12);
    setData({ ...data });
  };

  return (
    <div className="gradient-bg">
      <div className="container px-4 pt-20 pb-6 mx-auto sm:px-10">
        <p className="text-3xl font-bold text-center text-white md:text-4xl">
          Invest in Pieme Residences
        </p>

        <p className="mt-6 text-2xl text-center text-white underline underline-offset-8">
          Revenue Calculator
        </p>
      </div>
      <div className="grid md:grid-cols-2">
        <JackInTheBox triggerOnce>
          <div className="h-full ">
            <img
              src={residence}
              alt="acc"
              className="object-cover w-full h-full max-h-60 md:max-h-none"
            />
          </div>
        </JackInTheBox>
        <div className="p-10 md:p-10 md:max-w-xl">
          <div className="grid items-center grid-cols-2 gap-4 p-2 px-4 mt-2 bg-white rounded-md">
            <p className="text-sm border-e">Unit Price ($)</p>
            <Input
              type="number"
              value={data.unit}
              onChange={(e) => {
                data.unit = e.target.value;
                setData({ ...data });
              }}
              className="text-sm border-0 rounded-none focus:border-0"
            />
          </div>
          <div className="grid items-center grid-cols-2 gap-4 p-2 px-4 mt-2 bg-white rounded-md">
            <p className="text-sm border-e">Booking Fee(Per Night) ($)</p>
            <Input
              type="number"
              value={data.booking}
              onChange={(e) => {
                data.booking = e.target.value;
                setData({ ...data });
              }}
              className="text-sm border-0 rounded-none focus:border-0"
            />
          </div>

          <div className="grid items-center grid-cols-2 gap-4 p-2 px-4 mt-2 bg-white rounded-md">
            <p className="text-sm border-e">Booked Days(Monthly)</p>
            <Input
              type="number"
              value={data.days}
              onChange={(e) => {
                data.days = e.target.value;
                setData({ ...data });
              }}
              className="text-sm border-0 rounded-none focus:border-0"
            />
          </div>

          <button
            onClick={calculate}
            className="flex items-center gap-2 p-3 px-5 mt-4 text-white border border-white rounded-md cursor-pointer main-dark-light-bg"
          >
            <BsCalculator />
            <p className="text-sm">Calculate</p>
          </button>

          <div className="grid items-center grid-cols-2 gap-4 mt-5">
            <p className="text-white">Monthly Net Income</p>
            <p className="w-full p-2 px-4 text-white rounded-sm main-dark-light-bg">
              $ {data.monthly.toLocaleString("en-US")}
            </p>
          </div>

          <div className="grid items-center grid-cols-2 gap-4 mt-5">
            <p className="text-white">Annual Net Income</p>
            <p className="w-full p-2 px-4 text-white rounded-sm main-dark-light-bg">
              $ {data.annual.toLocaleString("en-US")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalculateInvestment;
