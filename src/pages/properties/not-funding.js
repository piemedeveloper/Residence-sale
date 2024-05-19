import React from "react";
import { Link } from "react-router-dom";
import { numberFormatter } from "../../utils/utils";
import { Progress, Spin } from "antd";
import { getToken } from "../../hooks/user-token";

function NotFunding({ residence }) {
  return (
    <>
      {Object.keys(residence).length === 0 ? (
        <div className="flex justify-center loader">
          <Spin size="large" />
        </div>
      ) : (
        <div className="container pb-6 mx-auto">
          <div className="text-center heading-color">
            <h1 className="mb-3 text-4xl font-semibold">{residence.name}</h1>
            <p className="text-lg">{residence.location}</p>
          </div>

          <div className="flex gap-2 mt-4">
            <Link to="/residences">
              <p className="main-color">Residences</p>
            </Link>
            <p>
              {">"} {residence.location}
            </p>
          </div>

          <div className="flex flex-col gap-8 p-4 mt-4 bg-white lg:flex-row rounded-xl home-property">
            <div className="w-full h-64 lg:w-2/5 max-h-64">
              <img
                src={residence.image}
                alt={residence.location}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="relative w-full lg:w-3/5">
              <p className="mb-3 text-lg font-bold uppercase heading-color">
                {residence.is_active === 1 ? "funding now" : "not funding now"}
              </p>
              <div className="relative grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-sm uppercase menu-color">
                    EST. ANNUAL RETURN
                  </p>
                  <h3 className="text-base font-semibold heading-color">
                    {residence.annual_yield}%
                  </h3>
                </div>
                <div>
                  <p className="text-sm uppercase menu-color">
                    Est. annual income
                  </p>
                  <h3 className="text-base font-semibold heading-color">
                    $
                    {numberFormatter(
                      (residence.annual_yield / 100) * residence.price
                    )}
                  </h3>
                </div>
                <div>
                  <p className="text-sm uppercase menu-color">
                    INVESTMENT TYPE
                  </p>
                  <h3 className="text-base font-semibold heading-color">
                    Croudfunding
                  </h3>
                </div>

                <div>
                  <p className="text-sm uppercase menu-color">PROPERTY TYPE</p>
                  <h3 className="text-base font-semibold heading-color">
                    Hotel room
                  </h3>
                </div>
              </div>

              <div className="relative bottom-0 w-full mt-8 lg:mt-0 lg:absolute">
                <a href={residence.pitch_deck} target="_blank" rel="noreferrer" className="flex">
                  <p className="px-10 py-2 mt-3 text-sm text-white main-bg rounded-tr-2xl">
                    Pitch deck
                  </p>
                </a>
                <Progress
                  percent={parseInt((residence.paid / residence.price) * 100)}
                />
                <div className="flex justify-between text-base">
                  <p className="menu-color">TARGET</p>
                  <p className="font-semibold heading-color">
                    ${numberFormatter(residence.price)}
                  </p>
                </div>
              </div>


            </div>
          </div>
          {getToken().length === 0 && (
            <div className="flex justify-center mt-4">
              <Link to="/login">
                <p className="my-6 invest-now">
                  Login / Sign up to view more information
                </p>
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default NotFunding;
