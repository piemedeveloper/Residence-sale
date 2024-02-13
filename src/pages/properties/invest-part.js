import React from "react";
import { Slider } from "antd";
import { low_investment } from "../../utils/data";

function InvestPart(props) {
  // const property = props.propperty;

  const onChange = (value) => {
    console.log("changed", value);
  };

  return (
    <div className="mt-6 bg-white rounded-lg">
      <p className="p-5 text-xs font-medium text-center border-b main-color">
        ACCUMULATED EARNINGS FORECAST
      </p>
      <div className="p-5">
        <p className="text-base head-color">
          Investment amount (minimum {low_investment})
        </p>

        <div className="flex items-center mt-3 overflow-hidden rounded-lg invest-container">
          <span className="px-4 py-2.5 invest-input font-medium">$</span>
          <input
            className="px-4 py-2 text-base font-medium bg-transparent outline-none"
            value={150}
            onChange={onChange}
            style={{ width: "100%", border: "none", borderRadius: 0 }}
          />
        </div>
        <Slider defaultValue={30} max={1000} className="mt-6" />

        <div className="flex gap-6">
          <div className="relative w-full">
            <div className="absolute bottom-0 w-full">
              <div className="w-full h-3 graph-bg"></div>
              <p className="text-base text-center head-color">Year 1</p>
            </div>
          </div>
          <div className="relative w-full">
            <div className="">
              <div className="w-full h-6 graph-bg"></div>
              <p className="text-base text-center head-color">Year 2</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-4 pb-2">
          <p className="entire-bg text-base md:text-base rounded-full text-white py-2.5 w-full text-center">
            Invest
          </p>
        </div>
      </div>
    </div>
  );
}

export default InvestPart;
