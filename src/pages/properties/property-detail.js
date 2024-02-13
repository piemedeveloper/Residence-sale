import React from "react";
import { useLocation } from "react-router-dom";
import _ from "lodash";
import { numberFormatter } from "../../utils/utils";
import { Progress } from "antd";
import InvestPart from "./invest-part";
import postData from "../../hooks/useFetch";

function PropertyDetail() {
  let location = useLocation();
  const [pid, setPid] = React.useState("");
  const [residence, setResidence] = React.useState({});

  const getProperty = (id) => {
    postData({
      service: "residence",
      data: {
        slag: id,
      },
    }).then((data) => {
      if (data.success === 1) {
        setResidence(data.data.residence);
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
    <div className="mx-auto container-box">
      {Object.keys(residence).length > 0 && (
        <div className="py-10">
          <p className="text-center uppercase header-color">
            {residence.location}
          </p>
          <h1 className="mt-4 text-3xl font-medium text-center main-color md:text-5xl">
            {residence.street}
          </h1>

          <div className="flex gap-6 mt-10">
            <div className="w-2/3">
              <div className="relative rounded-xl overflow-hidden max-h-[30rem]">
                <p
                  className={`uppercase text-white text-center p-1.5 text-base tracking-wide ${
                    residence.type === 0 ? "main-bg" : "entire-bg"
                  }`}
                >
                  {residence.type === 0 ? "funding" : "Entire property"}
                </p>
                <img
                  src={residence.image}
                  alt={residence.street}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="flex my-6 border rounded-xl">
                <div className="grid w-3/5 grid-cols-3 border-e">
                  <div className="relative p-5 border-e">
                    <p className="text-base">Investment term</p>
                    <p className="absolute text-lg font-semibold bottom-2 main-color">
                      {numberFormatter(residence.period)} Years
                    </p>
                  </div>

                  <div className="relative p-5 border-e">
                    <p className="text-base">Forecast annual rental returns</p>
                    <p className="absolute text-lg font-semibold bottom-2 main-color">
                      $
                      {numberFormatter(
                        residence.annual_yield * 0.01 * residence.price
                      )}
                    </p>
                  </div>

                  <div className="relative p-5">
                    <p className="text-base">Total forecast rental returns</p>
                    <p className="absolute text-lg font-semibold bottom-2 main-color">
                      $
                      {numberFormatter(
                        residence.annual_yield * 0.01 * residence.price * 2
                      )}
                    </p>
                  </div>
                </div>
                <div className="w-2/5 p-4">
                  <Progress
                    percent={parseInt((residence.paid / residence.price) * 100)}
                    size={[300, 15]}
                  />

                  <div className="flex justify-between mt-4">
                    <div>
                      <p className="text-base head-color">Investors to date</p>
                      <p className="font-medium main-color">
                        {numberFormatter(residence.investors)}
                      </p>
                    </div>
                    <div>
                      <p className="text-base head-color text-end">
                        Funding target
                      </p>
                      <p className="font-medium main-color text-end">
                        ${numberFormatter(residence.price)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-1/3">
              <div className="border rounded-xl">
                <p className="border-b p-4 text-center text-[13px] main-color font-medium">
                  FORECAST ANNUAL RENTAL YIELD
                </p>
                <p className="p-20 text-5xl font-medium text-center main-color">
                  {residence.annual_yield}%*
                </p>
              </div>

              {/* <InvestPart residence={residence} /> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PropertyDetail;
