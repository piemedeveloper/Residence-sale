import { Progress } from "antd";
import React from "react";
import { numberFormatter } from "../../utils/utils";

function InvestedUnitCell({ unit }) {
  return (
    <div className="overflow-hidden bg-white rounded-lg home-property">
      <div className="relative h-42">
        <img
          src={unit.images[0]}
          alt="unit.name"
          className="relative object-cover w-full h-full"
        />
      </div>

      <div className="p-4">
        <h2 className="font-medium">
          {unit.name} at {unit.residence} Residence
        </h2>
        <p className="mt-2">Percentage Ownership</p>
        <Progress
          percent={parseFloat((unit.amount / unit.cost) * 100).toFixed(2)}
          className="w-[92%]"
        />

        <div className="flex justify-between">
          <p className="head-color">Invested</p>
          <p className="font-medium main-color">
            ${numberFormatter(unit.amount)}
          </p>
        </div>

        {unit.annual_yield !== undefined && (
          <div>
            <h3 className="text-3xl font-semibold text-center main-color">
              ${unit.annual_yield}%*
            </h3>
            <p className="mt-2 text-center menu-color">
              Forecast annual rental yield
            </p>
          </div>
        )}

        <p className={`mt-3 text-sm line-clamp-3`}>{unit.description}</p>
      </div>

      <div className="w-full"></div>
    </div>
  );
}

export default InvestedUnitCell;
