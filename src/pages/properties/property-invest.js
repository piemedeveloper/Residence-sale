import { Steps, message, Slider } from "antd";
import React, { useState } from "react";
import { postDataAuth } from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import UnitCell from "./unit-cell";
import { low_investment } from "../../utils/data";
import NumericInput from "react-numeric-input";
import { numberFormatter } from "../../utils/utils";

import LoadDocument from "./load-document";

function PropertyInvest() {
  let location = useLocation();
  const [pid, setPid] = React.useState("");
  const [unit, setUnit] = useState({});
  const [invest, setInvest] = useState(150);
  document.title = "Investment";

  const getUnit = (id) => {
    postDataAuth({
      service: "get_acc_view",
      data: { id },
    }).then((data) => {
      if (data.success === 1) {
        setUnit(data.data);
      }
    });
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    let id = location.pathname.substring(1);
    id = id.length > 1 ? id.split("/")[id.split("/").length - 1] : "";
    if (pid !== id) {
      setPid(id);
      getUnit(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const steps = [
    {
      title: "Property selection",
      content: "First-content",
    },
    {
      title: "Amount",
      content: "Second-content",
    },
    {
      title: "Signature",
      content: "Second-content",
    },
    {
      title: "Payment",
      content: "Last-content",
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const [current, setCurrent] = useState(1);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div className="container py-12 mx-auto">
      <div>
        <div className="max-w-5xl mx-auto">
          <Steps current={current} items={items} />
        </div>

        <div className="my-12">
          {Object.keys(unit).length > 0 && (
            <div>
              {current === 1 && (
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-2xl text-center heading-color">
                    Enter the amount you would like to invest in{" "}
                    <span className="font-medium">{unit.name}</span> at Pieme{" "}
                    <span className="font-medium">{unit.residence}</span>{" "}
                    Residence
                  </h2>

                  <div className="grid max-w-3xl gap-10 mx-auto my-12 md:grid-cols-2">
                    <div>
                      <div className="flex justify-center">
                        <p className="px-8 py-1.5 text-white rounded-t-lg main-bg">
                          Selected
                        </p>
                      </div>
                      <div className="overflow-hidden bg-white rounded-2xl unit-selected">
                        <UnitCell unit={unit} />
                      </div>
                    </div>
                    <div>
                      <div className="mt-10 bg-white rounded-lg shadow-md">
                        <p className="p-4 text-base font-medium text-center border-b main-color">
                          Investment
                        </p>
                        <div className="p-5">
                          <p className="text-base head-color">
                            Investment amount (minimum {low_investment})
                          </p>

                          <div className="flex items-center mt-3 overflow-hidden rounded-lg invest-container">
                            <span className="px-4 py-2.5 invest-input font-medium">
                              $
                            </span>

                            <NumericInput
                              className="px-4 py-2 text-base font-medium bg-transparent outline-none"
                              min={150}
                              step={1}
                              max={unit.cost - unit.amount}
                              value={invest}
                              // eslint-disable-next-line
                              style={false}
                              onBlur={(e) => setInvest(e.target.value)}
                            />
                          </div>
                          <Slider
                            defaultValue={150}
                            max={unit.cost - unit.amount}
                            min={150}
                            value={invest}
                            onChange={(e) => setInvest(e)}
                            className="mt-6"
                          />

                          <div className="flex justify-between text-sm">
                            <p>$150</p>
                            <p>${numberFormatter(unit.cost - unit.amount)}</p>
                          </div>

                          <div className="flex justify-center pt-4 pb-2">
                            <button
                              onClick={next}
                              className="main-bg rounded-full text-white py-2.5 w-full text-center"
                            >
                              Continue to Signature
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {current === 2 && (
                <div>
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl text-center md:text-3xl heading-color">
                      You are investing{" "}
                      <span className="font-medium">
                        ${numberFormatter(invest)}
                      </span>{" "}
                      in <span className="font-medium">{unit.name}</span> at
                      Pieme{" "}
                      <span className="font-medium">{unit.residence}</span>{" "}
                      Residence
                    </h2>

                    <h3 className="mt-3 text-xl text-center md:text-2xl heading-color">
                      Please sign the document below:
                    </h3>

                    <div className="flex mt-10 overflow-hidden border">
                      {/* <div className="w-64 min-w-64">
                      <div className="p-5 text-xl font-semibold text-white border border-b-2 main-bg border-b-blue-400">
                        <p>Pieme Contracts</p>
                      </div>
                      <div className="h-full p-3 bg-white">
                        <p>Contracts</p>
                      </div>
                    </div> */}
                      <LoadDocument unit />
                    </div>

                    <div className="flex justify-end p-2 bg-white">
                      <button
                        onClick={() => {
                          // if (signature == null || signature.length === 0)
                          //   message.error(
                          //     "Please sign the document to continue"
                          //   );
                          // else
                          next();
                        }}
                        className="px-10 py-3 text-sm text-white rounded-md main-bg"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div
          style={{
            marginTop: 24,
          }}
        >
          {current > 1 && (
            <button
              style={{
                margin: "0 8px",
              }}
              onClick={() => prev()}
            >
              Previous
            </button>
          )}

          {current === steps.length - 1 && (
            <button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PropertyInvest;
