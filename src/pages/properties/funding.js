import React from "react";
import { numberFormatter } from "../../utils/utils";
import { Progress } from "antd";
import { Markup } from "interweave";

function Funding({ residence }) {
  return (
    <>
      {Object.keys(residence).length > 0 && (
        <div className="pt-8 pb-6">
          <p className="text-center uppercase header-color">
            {residence.location}
          </p>
          <h1 className="mt-4 text-3xl font-medium text-center main-color md:text-4xl">
            {residence.name} Residence
          </h1>

          <div className="flex flex-col gap-4 p-4 mt-8 bg-white lg:gap-10 lg:flex-row rounded-xl home-property">
            <div className="w-full lg:w-3/5">
              <div className="overflow-hidden max-h-[25rem] relative">
                <p
                  className={`uppercase text-white text-center p-1.5 text-base tracking-wide ${
                    residence.is_active === 1 ? "main-bg" : "entire-bg"
                  }`}
                >
                  {residence.is_active === 1
                    ? "funding now"
                    : "Not funding now"}
                </p>
                <img
                  src={residence.image}
                  alt={residence.street}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="flex items-center w-full lg:w-2/5 pe-2">
              <div>
                <div className="grid gap-6 mt-4 sm:grid-cols-2">
                  <div>
                    <h2 className="font-medium uppercase">
                      FORECAST ANNUAL RENTAL YIELD
                    </h2>
                    <p className="mt-2 main-color">{residence.annual_yield}%</p>
                  </div>
                  <div>
                    <h2 className="font-medium uppercase">
                      Forecast annual rental returns
                    </h2>
                    <p className="mt-2 main-color">
                      $
                      {" " +
                        numberFormatter(
                          residence.annual_yield * 0.01 * residence.price
                        )}
                    </p>
                  </div>

                  <div>
                    <h2 className="font-medium uppercase">Investor(s)</h2>
                    <p className="mt-2 main-color">
                      {numberFormatter(residence.investors)}
                    </p>
                  </div>

                  <div>
                    <h2 className="font-medium uppercase">Target</h2>
                    <p className="mt-2 main-color">
                      ${" " + numberFormatter(residence.price)}
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <p>Percentage Investment</p>
                  <Progress
                    percent={parseInt((residence.paid / residence.price) * 100)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-base md:text-lg menu-color">
            <h2 className="mb-2 text-2xl font-semibold heading-color">
              Why this place
            </h2>
            <Markup content={residence.description} />
          </div>
        </div>
      )}
    </>
  );
}

export default Funding;
