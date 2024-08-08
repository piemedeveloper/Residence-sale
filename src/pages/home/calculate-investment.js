import React from "react";

import { Input } from "antd";
import { BsCalculator } from "react-icons/bs";
import { JackInTheBox } from "react-awesome-reveal";
import residence from "../../assets/images/residence.jpeg";
import NumericInput from "react-numeric-input";
import { ceil } from "lodash";

function CalculateInvestment() {
  const [data, setData] = React.useState({
    unit: 65000,
    stake: 100,
    booking: 100,
    maintenance: 0,
    tax: 0,
    days: 23,
    monthly: 0,
    annual: 0,
  });

  const calculate = () => {
    data.maintenance = data.booking * 0.07
    data.tax = data.booking * 0.09
    data.monthly = Math.ceil(
      ((data.booking - data.maintenance - data.tax) * data.days * 0.7 * data.unit) / 65000
    );
    data.annual = Math.ceil(
      ((data.booking - data.maintenance - data.tax) * data.days * 0.7 * 12 * data.unit) / 65000
    );
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
          <p className="mb-6 text-xl text-white border-e">Unit cost : $ 65,000</p>
          <div className="grid items-center grid-cols-2 gap-4 p-2 px-4 mt-2 bg-white rounded-md">
            <p className="text-sm border-e">Amount Invested ($)</p>

            <NumericInput
              min={150}
              step={1}
              max={65000}
              style={false}
              value={data.unit}
              onBlur={(e) => {
                data.unit = e.target.value;
                data.stake = (data.unit / 65000) * 100
                setData({ ...data });
              }}
              className="text-sm border-0 rounded-none focus:border-0 py-1.5"
            />
          </div>

          <div className="grid items-center grid-cols-2 gap-4 p-2 px-4 mt-2 bg-white rounded-md">
            <p className="text-sm border-e">Percentage Stake (%)</p>
            <p className="text-sm border-0 rounded-none focus:border-0 ps-3">{data.stake}</p>
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
            <p className="text-white">Maintenance (7%)</p>
            <p className="w-full p-2 px-4 text-white rounded-sm main-dark-light-bg">
              $ {data.maintenance.toLocaleString("en-US")}
            </p>
          </div>


          <div className="grid items-center grid-cols-2 gap-4">
            <p className="text-white">Tax ( 9% )</p>
            <p className="w-full p-2 px-4 text-white rounded-sm main-dark-light-bg">
              $ {data.tax.toLocaleString("en-US")}
            </p>
          </div>

          <div className="grid items-center grid-cols-2 gap-4">
            <p className="text-white">Pieme Income</p>
            <p className="w-full p-2 px-4 text-white rounded-sm main-dark-light-bg">
              $ {(Math.ceil(
                ((data.booking - data.maintenance - data.tax) * data.days * 0.3 * data.unit) / 65000
              )).toLocaleString("en-US")}
            </p>
          </div>

          <div className="grid items-center grid-cols-2 gap-4">
            <p className="text-white">Monthly Net Income</p>
            <p className="w-full p-2 px-4 text-white rounded-sm main-dark-light-bg">
              $ {data.monthly.toLocaleString("en-US")}
            </p>
          </div>

          <div className="grid items-center grid-cols-2 gap-4">
            <p className="text-white">Annual Net Income</p>
            <p className="w-full p-2 px-4 text-white rounded-sm main-dark-light-bg">
              $ {data.annual.toLocaleString("en-US")}
            </p>
          </div>

          <div className="grid items-center grid-cols-2 gap-4">
            <p className="text-white">Annual Percentage Yield (%)</p>
            <p className="w-full p-2 px-4 text-white rounded-sm main-dark-light-bg">
              {((data.annual / data.unit) * 100).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalculateInvestment;
