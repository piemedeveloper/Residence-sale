import { Progress } from "antd";
import React from "react";
import { numberFormatter } from "../../utils/utils";
import { Link } from "react-router-dom";

function UnitCell({ unit }) {
  return (
    <Link
      to={`${
        unit.amount > 0 && unit.amount === unit.cost
          ? ""
          : `/dashboard/residences/invest/${unit.enc_id}`
      }`}
    >
      <div className="overflow-hidden bg-white rounded-lg home-property">
        <div className="relative h-42">
          <img
            src={unit.images[0]}
            alt="unit.name"
            className="relative object-cover w-full h-full"
          />
          {unit.amount > 0 && unit.amount === unit.cost && (
            <div
              class={`w-full h-full absolute top-0 bg-blue-600/30 backdrop-brightness-[60%] flex items-center justify-center`}
            >
              <div className="pt-3 text-xl font-medium text-center text-white uppercase md:text-2xl">
                <p>Fully funded</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-4">
          <h2 className="font-medium">{unit.name}</h2>

          <Progress
            percent={parseInt((unit.amount / unit.cost) * 100)}
            className="w-full"
          />

          <div className="flex justify-between text-sm">
            <div>
              <p className="head-color">Investor(s)</p>
              <p className="font-medium main-color">
                {numberFormatter(unit.investors)}
              </p>
            </div>
            <div>
              <p className="head-color text-end">Target</p>
              <p className="font-medium main-color text-end">
                ${numberFormatter(unit.cost)}
              </p>
            </div>
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

          <div className="flex justify-center mt-4">
            <p className="px-10 py-2 text-sm text-white rounded-full main-bg">
              Invest now
            </p>
          </div>
        </div>

        <div className="w-full"></div>
      </div>
    </Link>
  );
}

export default UnitCell;
