import React from "react";
import { Link } from "react-router-dom";
import { formatDate, numberFormatter } from "../../utils/utils";
import { Progress } from "antd";

function PropertyCell(props) {
  const property = props.property;

  return (
    <div className="relative pb-8 overflow-hidden bg-white shadow-md rounded-xl">
      <Link to={`/properties/${property.slag}`}>
        <div className="relative h-48 sm:h-52">
          <img
            src={property.image}
            alt={property.street}
            className="object-cover w-full h-full"
          />
          <p className="absolute px-2 py-1 text-xs rounded-full top-3 left-3 period-bg">
            {property.period}-Year term
          </p>

          {property.paid === property.price && (
            <div
              class={`w-full h-full absolute top-0 ${
                property.type === 0 ? "bg-blue-600/30" : "bg-green-600/20"
              }  backdrop-brightness-[40%] flex items-center justify-center`}
            >
              <div className="pt-3 text-xl font-medium text-center text-white uppercase md:text-2xl">
                <p>Fully funded</p>
                <p>{formatDate(property.modification_datetime)}</p>
              </div>
            </div>
          )}
        </div>
      </Link>

      <p
        className={`uppercase text-white text-center p-1.5 text-base tracking-wide ${
          property.type === 0 ? "main-bg" : "entire-bg"
        }`}
      >
        {property.type === 0 ? "funding" : "Entire property"}
      </p>

      <div className="p-6">
        <h2 className="text-center head-color uppercase text-[13px] font-medium mt-2">
          {property.location}
        </h2>
        <Link to={`/properties/${property.slag}`}>
          <p className="my-2 mb-6 font-semibold text-center md:text-lg main-color">
            {property.street}
          </p>
        </Link>

        <Progress percent={parseInt((property.paid / property.price) * 100)} />
        <div className="flex justify-between">
          <div>
            <p className="text-base md:text-[15px]">Investors</p>
            <p className="entire-color font-semibold text-base md:text-[15px]">
              {numberFormatter(property.investors)}
            </p>
          </div>
          <div>
            <p className="text-base md:text-[15px] text-end">Target</p>
            <p className="entire-color font-semibold text-end text-base md:text-[15px]">
              ${numberFormatter(property.price)}
            </p>
          </div>
        </div>

        <p className="mt-3 text-3xl font-semibold text-center md:text-4xl main-color">
          {property.annual_yield}%*
        </p>
        <p className="mt-1 text-center head-color">
          Forecast annual rental yield
        </p>

        {property.price !== property.paid && (
          <div className="flex justify-center py-4">
            <Link to={`/properties/${property.slag}/invest`}>
              <p className="entire-bg text-base md:text-base rounded-full text-white py-2.5 px-8">
                Invest now
              </p>
            </Link>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 w-full p-3 border-t">
        <Link to={`/properties/${property.slag}`}>
          <p className="text-base font-medium text-center entire-color">
            View details
          </p>
        </Link>
      </div>
    </div>
  );
}

export default PropertyCell;
