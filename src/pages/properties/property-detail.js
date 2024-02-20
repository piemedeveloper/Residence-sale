import React from "react";
import { useLocation } from "react-router-dom";
import _ from "lodash";
import { numberFormatter } from "../../utils/utils";
import { Progress } from "antd";
import postData from "../../hooks/useFetch";
import UnitCell from "./unit-cell";
import { Markup } from "interweave";

function PropertyDetail() {
  let location = useLocation();
  const [pid, setPid] = React.useState("");
  const [residence, setResidence] = React.useState({});
  const [units, setUnits] = React.useState([]);

  const getProperty = (id) => {
    postData({
      service: "residence",
      data: {
        slag: id,
      },
    }).then((data) => {
      if (data.success === 1) {
        document.title = data.data.residence.name;
        setResidence(data.data.residence);
        setUnits(data.data.units);
      }
    });
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    let id = location.pathname.substring(1);

    id = id.length > 1 ? id.split("/")[id.split("/").length - 1] : "";
    if (pid !== id) {
      setPid(id);
      getProperty(id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div>
      <div className="mx-auto container-box">
        {Object.keys(residence).length > 0 && (
          <div className="pt-8 pb-6">
            <p className="text-center uppercase header-color">
              {residence.location}
            </p>
            <h1 className="mt-4 text-3xl font-medium text-center main-color md:text-5xl">
              {residence.name} Residence
            </h1>

            <div className="flex flex-col gap-6 mt-10 lg:flex-row">
              <div className="w-full lg:w-3/5">
                <div className="relative rounded-xl overflow-hidden max-h-[28rem]">
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

                <div className="flex flex-col my-6 border md:flex-row rounded-xl">
                  <div className="grid w-full grid-cols-2 md:w-3/5 border-e">
                    <div className="relative p-5 border-e">
                      <p className="text-base">Investment term</p>
                      <p className="absolute text-lg font-semibold bottom-4 md:bottom-2 main-color">
                        {numberFormatter(residence.period)} Years
                      </p>
                    </div>

                    <div className="relative p-5 border-e">
                      <p className="text-base">
                        Forecast annual rental returns
                      </p>
                      <p className="relative mt-6 text-lg font-semibold md:absolute md:bottom-2 main-color">
                        $
                        {numberFormatter(
                          residence.annual_yield * 0.01 * residence.price
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="w-full p-4 md:w-2/5">
                    <Progress
                      percent={parseInt(
                        (residence.paid / residence.price) * 100
                      )}
                    />

                    <div className="flex justify-between mt-4">
                      <div>
                        <p className="text-base head-color">Investors</p>
                        <p className="font-medium main-color">
                          {numberFormatter(residence.investors)}
                        </p>
                      </div>
                      <div>
                        <p className="text-base head-color text-end">Target</p>
                        <p className="font-medium main-color text-end">
                          ${numberFormatter(residence.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-2/5">
                <div className="border rounded-xl">
                  <p className="border-b p-3 text-center text-[13px] main-color font-medium">
                    FORECAST ANNUAL RENTAL YIELD
                  </p>
                  <p className="p-4 text-3xl font-medium text-center main-color">
                    {residence.annual_yield}%*
                  </p>
                </div>

                <div className="p-6 mt-5 bg-white rounded-lg">
                  <h2 className="mb-3 text-2xl font-semibold heading-color">
                    Why this place
                  </h2>
                  <div className="menu-color">
                    <Markup content={residence.description} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {units.length > 0 && (
        <div className="py-10 bg-white">
          <h2 className="container max-w-2xl mx-auto mb-10 text-3xl font-medium text-center md:text-4xl heading-color">
            Available units at Pieme Residence
            <br /> {residence.name}
          </h2>
          <div className="container grid gap-6 pb-10 mx-auto sm:grid-cols-2 lg:grid-cols-3">
            {_.map(units, (unit, i) => (
              <UnitCell key={i} unit={unit} invest={true} clamp={true} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PropertyDetail;
