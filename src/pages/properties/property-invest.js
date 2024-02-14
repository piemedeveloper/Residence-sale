import { Steps, message, Slider, Tabs } from "antd";
import React, { useState, useRef } from "react";
import { postDataAuth } from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import UnitCell from "./unit-cell";
import { low_investment, text_to_signature } from "../../utils/data";
import NumericInput from "react-numeric-input";
import { numberFormatter } from "../../utils/utils";
import { IoIosCloseCircle } from "react-icons/io";

import _ from "lodash";
import {
  EditOutlined,
  CloudUploadOutlined,
  FontColorsOutlined,
} from "@ant-design/icons";

import SignatureCanvas from "react-signature-canvas";

function PropertyInvest() {
  let location = useLocation();
  const [pid, setPid] = React.useState("");
  const [tab, setTab] = React.useState("1");
  const [sign, setSign] = React.useState(false);
  const [unit, setUnit] = useState({});
  const [invest, setInvest] = useState(150);
  const [trimmedDataURL, setTrimmedDataURL] = useState(null);
  const [textSignature, setTextSignature] = useState(null);
  document.title = "Investment";

  const [signature, setSignature] = useState(null);

  const sigPad = useRef();
  const mySignature = () => {
    if (tab === "1")
      setSignature(sigPad.current.getTrimmedCanvas().toDataURL("image/png"));
    else if (tab === "2") setSignature(textSignature);

    setSign(false);
  };

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

  const tabs = [
    {
      key: "1",
      label: "Draw Signature",
      icon: <EditOutlined />,
      children: (
        <div className="relative w-full">
          <div className="flex justify-center">
            <SignatureCanvas
              penColor="black"
              canvasProps={{
                width: 500,
                height: 200,
                className: "sigCanvas border",
              }}
              ref={sigPad}
            />
          </div>

          <button
            className="absolute px-4 py-2 text-sm text-white bg-red-500 rounded-md top-2 right-10"
            onClick={() => {
              sigPad.current.clear();
            }}
          >
            Clear
          </button>
        </div>
      ),
    },
    {
      key: "2",
      label: "Type Signature",
      icon: <FontColorsOutlined />,
      children: (
        <div>
          <input
            type="text"
            placeholder="Enter signature text"
            className="w-full p-4 text-lg signature-input"
            onChange={(e) => {
              if (e.target.value.length > 0)
                setTextSignature(text_to_signature(e.target.value));
              else setTextSignature(null);
            }}
          />

          {textSignature ? (
            <img className="h-20" src={textSignature} alt="Text Signature" />
          ) : null}
        </div>
      ),
    },
    {
      key: "3",
      label: "Upload Signature",
      icon: <CloudUploadOutlined />,
      children: "Content of Tab Pane 3",
    },
  ];

  const tabChange = (t) => {
    // setTab(t);
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

                  <div className="grid max-w-3xl grid-cols-2 gap-10 mx-auto my-12">
                    <div className="overflow-hidden bg-white rounded-2xl unit-selected">
                      <UnitCell unit={unit} />
                    </div>
                    <div>
                      <div className="bg-white rounded-lg shadow-md">
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
                    <h2 className="text-3xl text-center heading-color">
                      You are investing{" "}
                      <span className="font-medium">
                        ${numberFormatter(invest)}
                      </span>{" "}
                      in <span className="font-medium">{unit.name}</span> at
                      Pieme{" "}
                      <span className="font-medium">{unit.residence}</span>{" "}
                      Residence
                    </h2>

                    <h3 className="mt-3 text-2xl text-center heading-color">
                      Please sign the document below:
                    </h3>
                  </div>

                  <div className="flex mt-10 overflow-hidden border">
                    <div className="w-64 min-w-64">
                      <div className="p-5 text-xl font-semibold text-white border border-b-2 main-bg border-b-blue-400">
                        <p>Pieme Contracts</p>
                      </div>
                      <div className="h-full p-3 bg-white">
                        <p>Contracts</p>
                      </div>
                    </div>
                    <div className="relative w-full">
                      <div className="p-5 text-xl font-semibold bg-white border border-b-2 border-b-blue-400 main-color">
                        <p>
                          Binding Terms - {unit.name} at Pieme {unit.residence}{" "}
                          Residence
                        </p>
                      </div>
                      <div className="relative h-[40rem] overflow-y-scroll gray-bg">
                        <div className="px-8 py-6 m-8 bg-white home-property">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Enim diam vulputate ut pharetra
                            sit. Elementum facilisis leo vel fringilla est
                            ullamcorper eget nulla facilisi. Adipiscing bibendum
                            est ultricies integer quis auctor elit. Netus et
                            malesuada fames ac turpis. Suspendisse ultrices
                            gravida dictum fusce ut placerat. Adipiscing elit
                            duis tristique sollicitudin. Vitae nunc sed velit
                            dignissim. Vitae aliquet nec ullamcorper sit amet
                            risus nullam eget felis. Turpis egestas maecenas
                            pharetra convallis posuere morbi leo urna
                          </p>

                          <div className="flex">
                            <div
                              onClick={() => setSign(true)}
                              className="px-6 py-4 my-4 border-2 border-black cursor-pointer hover:border-blue-700"
                            >
                              {signature && signature.length > 0 ? (
                                <img
                                  className="h-20"
                                  src={signature}
                                  alt="Signature"
                                />
                              ) : (
                                <div className="px-10 py-4 text-sm ">
                                  <p>Click here to sign</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="px-8 py-6 m-8 bg-white home-property pb-96">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Enim diam vulputate ut pharetra
                            sit. Elementum facilisis leo vel fringilla est
                            ullamcorper eget nulla facilisi. Adipiscing bibendum
                            est ultricies integer quis auctor elit. Netus et
                            malesuada fames ac turpis. Suspendisse ultrices
                            gravida dictum fusce ut placerat. Adipiscing elit
                            duis tristique sollicitudin. Vitae nunc sed velit
                            dignissim. Vitae aliquet nec ullamcorper sit amet
                            risus nullam eget felis. Turpis egestas maecenas
                            pharetra convallis posuere morbi leo urna
                          </p>

                          <div className="flex">
                            <div
                              onClick={() => setSign(true)}
                              className="px-6 py-4 my-4 border-2 border-black cursor-pointer hover:border-blue-700"
                            >
                              {signature && signature.length > 0 ? (
                                <img
                                  className="h-20"
                                  src={signature}
                                  alt="Signature"
                                />
                              ) : (
                                <div className="px-10 py-4 text-sm ">
                                  <p>Click here to sign</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`absolute bottom-0 ${
                          !sign && "hidden"
                        } w-full bg-white border-t`}
                      >
                        <div className="flex items-center justify-between px-4 border-b">
                          <p className="p-4 text-2xl ">Signature</p>
                          <button onClick={() => setSign(false)}>
                            <IoIosCloseCircle className="text-4xl text-red-600" />
                          </button>
                        </div>
                        <div className="px-4">
                          <Tabs
                            defaultActiveKey="1"
                            items={tabs}
                            onChange={(t) => setTab(t)}
                          />

                          <div className="flex justify-end w-full gap-10 p-2 mt-4 text-sm border-t border-b signature-buttons">
                            <button onClick={mySignature}>Confirm</button>
                            <button>Submit</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end p-2 bg-white">
                    <button
                      onClick={() => {
                        if (signature == null || signature.length === 0)
                          message.error("Please sign the document to continue");
                        else next();
                      }}
                      className="px-10 py-3 text-sm text-white rounded-md main-bg"
                    >
                      Submit
                    </button>
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
