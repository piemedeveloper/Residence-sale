import { Progress } from "antd";
import React from "react";
import { numberFormatter } from "../../utils/utils";
import { Link } from "react-router-dom";

function InvestedUnitCell({ unit }) {
  return (
    // <Link to={`${unit.amount > 0 && unit.amount === unit.cost
    //   ? `/dashboard/unit/${unit.enc_id}`
    //   : `/dashboard/residences/invest/${unit.enc_id}`
    //   }`}>

    <Link to={`/dashboard/residences/invest/${unit.enc_id}`}>
      <div className="overflow-hidden bg-white rounded-lg home-property">
        <div className="relative h-42">
          <img
            src={unit.images[0]}
            alt="unit.name"
            className="relative object-cover w-full h-full"
          />
        </div>

        <div className="p-4 text-sm">
          <h2 className="text-base font-semibold">
            {unit.name} at {unit.residence} Residence
          </h2>
          <p className="mt-2">Percentage Ownership</p>
          <Progress
            percent={parseFloat((unit.amount / unit.cost) * 100).toFixed(2)}
            className="w-[97%]"
          />

          <div className="flex justify-between mb-3">
            <p className="head-color">Amount Invested</p>
            <p className="font-medium main-color">
              ${numberFormatter(unit.amount)}
            </p>
          </div>

          {unit.annual_yield !== undefined && (
            <div>
              <h3 className="text-3xl font-semibold text-center main-color">
                ${unit.annual_yield}%
              </h3>
              <p className="mt-2 text-center menu-color">
                Forecast annual rental yield
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default InvestedUnitCell;
