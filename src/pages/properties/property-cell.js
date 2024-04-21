import React from "react";
import { Link } from "react-router-dom";
import { formatDate, numberFormatter } from "../../utils/utils";
import { Progress } from "antd";

function PropertyCell({ residence }) {
  return (
    <div className="relative pb-8 overflow-hidden bg-white shadow-md rounded-xl">
      <Link to={`/dashboard/residences/${residence.slag}`}>
        <div className="relative">
          <img
            src={residence.image}
            alt={residence.name}
            className="object-cover w-full aspect-[5/3]"
          />

          {residence.paid > 0 && residence.paid === residence.price && (
            <div
              className={`w-full h-full absolute top-0 ${
                residence.type === 0 ? "bg-blue-600/30" : "bg-green-600/20"
              }  backdrop-brightness-[40%] flex items-center justify-center`}
            >
              <div className="pt-3 text-xl font-medium text-center text-white uppercase md:text-2xl">
                <p>Fully funded</p>
                <p>{formatDate(residence.modification_datetime)}</p>
              </div>
            </div>
          )}
        </div>
      </Link>

      <p
        className={`capitalize text-white text-center p-1.5 text-sm tracking-wide ${
          residence.is_active === 1 ? "bg-orange-500" : "entire-bg"
        }`}
      >
        {residence.is_active === 1 ? "funding now" : "not funding now"}
      </p>

      <div className="p-4">
        <h2 className="text-center head-color uppercase text-[13px] font-medium">
          {residence.name},{" "}
          <span className="font-bold main-color">{residence.location}</span>
        </h2>

        <Progress
          percent={parseInt((residence.paid / residence.price) * 100)}
        />
        <div className="flex justify-between text-sm">
          <div>
            <p className="">Investors</p>
            <p className="text-[0.9rem] font-semibold entire-color">
              {numberFormatter(residence.investors)}
            </p>
          </div>
          <div>
            <p className="text-end">Target</p>
            <p className="text-[0.9rem] font-semibold entire-color text-end">
              ${numberFormatter(residence.price)}
            </p>
          </div>
        </div>

        <p className="mt-2 text-2xl font-semibold text-center md:text-3xl main-color">
          {residence.annual_yield}%
        </p>
        <p className="mt-1 mb-3 text-center head-color">
          Forecast annual rental yield
        </p>
      </div>

      <div className="absolute bottom-0 w-full p-3 border-t">
        <Link to={`/dashboard/residences/${residence.slag}`}>
          <p className="text-[0.95rem] font-medium text-center entire-color">
            View details
          </p>
        </Link>
      </div>
    </div>
  );
}

export default PropertyCell;
