import React from "react";
import { Link } from "react-router-dom";
import { formatDate, numberFormatter } from "../../utils/utils";
import { Progress } from "antd";

function HomePropertyCell({ residence }) {
  return (
    <div className="relative pb-8 overflow-hidden bg-white home-property rounded-xl">
      <Link to={`/residences/${residence.slag}`}>
        <div className="relative h-48 sm:h-52">
          <img
            src={residence.image}
            alt={residence.location}
            className="object-cover w-full h-full"
          />
          <p className="absolute px-2 py-1 text-xs rounded-full top-3 left-3 period-bg">
            {residence.period}-Year term
          </p>

          {residence.paid > 0 && residence.paid === residence.price && (
            <div
              class={`w-full h-full absolute top-0 ${
                residence.is_active === 0 ? "bg-blue-600/30" : "bg-green-600/20"
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
        className={`uppercase text-white text-center p-1.5 text-base tracking-wide ${
          residence.is_active === 1 ? "main-bg" : "entire-bg"
        }`}
      >
        {residence.is_active === 1 ? "funding now" : "Not Funding now"}
      </p>

      <div className="p-6">
        <h2 className="text-center head-color uppercase text-[13px] mt-2">
          {residence.name}
        </h2>
        <Link to={`/residences/${residence.slag}`}>
          <p className="mb-6 font-semibold text-center md:text-lg main-color">
            {residence.location}
          </p>
        </Link>

        <Progress
          percent={parseInt((residence.paid / residence.price) * 100)}
        />
        <div className="flex justify-between">
          <p className="text-base md:text-[15px]">Target</p>
          <p className="entire-color font-semibold text-end text-base md:text-[15px]">
            ${numberFormatter(residence.price)}
          </p>
        </div>

        <p className="mt-3 text-3xl font-semibold text-center md:text-4xl main-color">
          {residence.annual_yield}%*
        </p>
        <p className="mt-1 mb-3 text-center head-color">
          Forecast annual rental yield
        </p>
      </div>

      <div className="absolute bottom-0 w-full p-3 border-t">
        <Link to={`/residences/${residence.slag}`}>
          <p className="text-base font-medium text-center entire-color">
            View details
          </p>
        </Link>
      </div>
    </div>
  );
}

export default HomePropertyCell;
