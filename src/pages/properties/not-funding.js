import React from "react";
import { Link } from "react-router-dom";
import { numberFormatter } from "../../utils/utils";
import { Progress, Spin } from "antd";
import { getToken } from "../../utils/useToken";

function NotFunding({ residence }) {
  return (
    <>
      {Object.keys(residence).length === 0 ? (
        <div className="flex justify-center loader">
          <Spin size="large" />
        </div>
      ) : (
        <div className="container py-10 mx-auto ">
          <div className="text-center heading-color">
            <h1 className="mb-3 text-5xl font-semibold">{residence.name}</h1>
            <p className="text-lg">{residence.location}</p>
          </div>

          <div className="flex gap-2 mt-10">
            <Link to="/residences">
              <p className="main-color">Residences</p>
            </Link>
            <p>
              {">"} {residence.location}
            </p>
          </div>

          <div className="flex flex-col gap-8 p-4 mt-4 bg-white lg:flex-row rounded-xl home-property">
            <div className="w-full lg:w-2/5 h-60 max-h-60">
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
                <p className="mt-20 text-center register-btn">
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
