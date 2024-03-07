import { FaArrowLeft } from "react-icons/fa";
import { Steps, message, Slider, Collapse, notification } from "antd";
import React, { useState } from "react";
import postData, { postDataAuth } from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import UnitCell from "./unit-cell";
import { low_investment } from "../../utils/data";
import NumericInput from "react-numeric-input";
import { base_url, numberFormatter } from "../../utils/utils";
import mtn from "../../assets/images/mtn-logo.png";
import _, { ceil } from "lodash";
import { Spin, Modal } from "antd";
import copy from "copy-to-clipboard";

import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

import LoadDocument from "./load-document";
import axios from "axios";
import CryptoPayments from "./crypto-payments";

function PropertyInvest({ user }) {
  let location = useLocation();
  const navigate = useNavigate();
  const [pid, setPid] = React.useState("");
  const [unit, setUnit] = useState({});
  const [cValue, setCValue] = useState(0);
  const [invest, setInvest] = useState(150);
  const [signature, setSignature] = useState(null);
  const [docSign, setDocSign] = useState({});
  const [phone, setPhone] = useState("");
  const [countDown, setCountDown] = useState(false);
  document.title = "Investment";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    uploadImage();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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

    postDataAuth({
      service: "get_conversions",
      data: {},
    }).then((data) => {
      if (data.success === 1) {
        const cv = _.filter(data.data, { currency: "UGX" });
        if (cv.length > 0) setCValue(cv[0].value);
      }
    });
  };

  const addSignature = (sign) => {
    setSignature(sign);
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
  const [btnDis, setBtnDis] = useState(false);

  const next = () => {
    // if (current === 1 && user.nok !== undefined && user.nok !== null)
    //   setCurrent(current + 2);
    // else
    setCurrent(current + 1);
  };

  const Ref = React.useRef(null);

  // The state for our timer
  const [timer, setTimer] = useState("00");

  const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 40);
    return deadline;
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const clearTimer = (e, transactionId) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer("40");

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e, transactionId);
    }, 1000);
    Ref.current = id;
  };

  const startTimer = (e, transactionId) => {
    let { total, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(seconds > 9 ? seconds : "0" + seconds);
      if (total === 0) {
        postData({
          service: "check_transaction",
          data: {
            id: transactionId,
          },
        }).then((data) => {
          if (data.status === 1) {
            if (data.transaction.status !== "PENDING") {
              notification.success({
                message: "Mobile money payment success",
                description: "Payment successfully received",
              });
              navigate("/dashboard/investments");
            }
          } else {
            if (data.transaction !== undefined) {
              if (data.transaction.reason === "PAYER_NOT_FOUND")
                notification.error({
                  message: "Mobile money payment failed",
                  description: "Please enter an MTN phone number",
                });
              if (data.transaction.reason === "PAYER_LIMIT_REACHED")
                notification.error({
                  message: "Mobile money payment failed",
                  description: "Limit for payment reached",
                });
              if (
                data.transaction.reason === "NOT_ENOUGH_FUNDS" ||
                data.transaction.reason ===
                  "LOW_BALANCE_OR_PAYEE_LIMIT_REACHED_OR_NOT_ALLOWED"
              )
                notification.error({
                  message: "Mobile money payment failed",
                  description: "Insufficient balance on your account",
                });
            }
          }
          setBtnDis(false);
          setCountDown(false);
        });
      }
    }
  };

  const mobileMoneyPay = () => {
    if (phone.length === 0) message.error("Please enter a phone number");
    else if (!isValidPhoneNumber(phone))
      message.error("Please enter a valid Phone number");
    else {
      setBtnDis(true);

      postData({
        service: "mobile_money",
        data: {
          phone: phone.substring(1),
          currency: 800,
          amount: parseFloat(invest),
          unit_id: unit.id,
          signature: docSign.signature,
        },
      }).then((data) => {
        setBtnDis(false);
        if (data.status === 1) {
          notification.success({
            message: "Mobile money payment success",
            description:
              "Payment successfully initaited, please enter your pin",
          });

          setBtnDis(true);
          setCountDown(true);
          clearTimer(getDeadTime(), data.transactionId);
        } else {
          if (data.transaction.reason === "PAYER_NOT_FOUND")
            notification.error({
              message: "Mobile money payment failed",
              description: "Please enter an MTN phone number",
            });
          if (data.transaction.reason === "PAYER_LIMIT_REACHED")
            notification.error({
              message: "Mobile money payment failed",
              description: "Limit for payment reached",
            });
          if (
            data.transaction.reason === "NOT_ENOUGH_FUNDS" ||
            data.transaction.reason ===
              "LOW_BALANCE_OR_PAYEE_LIMIT_REACHED_OR_NOT_ALLOWED"
          )
            notification.error({
              message: "Mobile money payment failed",
              description: "Insufficient balance on your account",
            });
        }
      });
    }
  };

  const to_pay = [
    { label: "Name", value: `${user.first_name} ${user.last_name}` },
    { label: "Username", value: user.username },
    {
      label: "Percentage stake",
      value: `${parseFloat((invest / unit.cost) * 100).toFixed(2)}%`,
    },
    {
      label: "Amount invested",
      value: `$ ${numberFormatter(parseFloat(invest))}`,
    },
    {
      label: "Platform fee",
      value: `$ ${numberFormatter(ceil(parseFloat(invest) * 0.03))}`,
    },
    {
      label: "Total to Pay",
      value: `$ ${numberFormatter(
        parseFloat(invest) * 0.03 + parseFloat(invest)
      )}`,
    },
  ];
  const payments = [
    {
      key: "1",
      label: "Mobile Money Payment (For Ugandan Investors only)",
      children: (
        <div>
          <img
            src={mtn}
            alt="Pieme MTN mobile money payment"
            className="object-cover w-10 h-10 mb-2"
          />
          <p className="my-4 font-semibold main-color">
            Note: MTN Phone number is currently being supported
          </p>

          <div className="text-base">
            <table>
              <tbody>
                {to_pay.map((p, i) => (
                  <tr key={i}>
                    <td className="py-1 pe-4">
                      <p>{p.label}</p>
                    </td>
                    <td>
                      <p>{p.value}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="pb-2 mt-2 text-xl font-semibold main-color">
            UGX.{" "}
            {numberFormatter(
              ceil(
                parseFloat(cValue) *
                  (parseFloat(invest) + parseFloat(invest) * 0.03)
              )
            )}
          </p>

          <p>Phone Number</p>
          <div className="phone-input">
            <PhoneInput
              placeholder="Enter phone number"
              defaultCountry="UG"
              countries={["UG"]}
              value={phone}
              onChange={(e) => {
                setPhone(e);
              }}
            />
          </div>

          <button
            onClick={mobileMoneyPay}
            disabled={btnDis}
            className="w-full flex items-center justify-center gap-3 px-10 py-2.5 mt-8 text-white rounded-md main-bg"
          >
            {!countDown && btnDis && <Spin />}
            <p> {countDown ? `Waiting... ${timer}` : "Make Payment"}</p>
          </button>
        </div>
      ),
    },
    {
      key: "2",
      label: "Pay with bank transfer",
      children: (
        <div>
          {/* <BankPayment invest={invest} user={user} /> */}
          <p>Coming soon</p>
        </div>
      ),
    },
    {
      key: "3",
      label: "Crypto Currency Payment",
      children: <CryptoPayments to_pay={to_pay} invest={invest} unit={unit} />,
    },
  ];

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  /** Upload signature image */
  let uploadImage = () => {
    handleCancel();
    //Check if any file is selected or not
    if (signature != null) {
      const file = dataURLtoFile(signature, "signature.png");

      const formData = new FormData();
      formData.append("image", file);

      axios
        .post(`${base_url}image_upload`, formData)
        .then((res) => {
          if (res.data.status === 1) {
            docSign.signature = res.data.data[res.data.data.length - 1];
            setDocSign({ ...docSign });

            postData({
              service: "sign_document",
              data: docSign,
            }).then((data) => {
              if (data.success === 1) {
                message.success("Document signed");
                next();
              } else message.error(data.message);
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      //if no file selected the show alert
      alert("Please Select File first");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(docSign).length === 0)
      notification.error({
        message: "Document sign",
        description: "Please fill in all fields",
      });
    else if (docSign.nok.trim().toString().length === 0)
      notification.error({
        message: "Document sign",
        description: "Please enter name of your next of kin",
      });
    else if (docSign.nok_relationship.trim().toString().length === 0)
      notification.error({
        message: "Document sign",
        description: "Please enter your relationship with the next of kin",
      });
    else if (docSign.nok_address.trim().toString().length === 0)
      notification.error({
        message: "Document sign",
        description: "Please enter your next of kin address",
      });
    else if (docSign.beneficiary.trim().toString().length === 0)
      notification.error({
        message: "Document sign",
        description: "Please enter name of your beneficiary",
      });
    else if (docSign.beneficiary_relationship.trim().toString().length === 0)
      notification.error({
        message: "Document sign",
        description: "Please enter your relationship with the beneficiary",
      });
    else if (docSign.beneficiary_address.trim().toString().length === 0)
      notification.error({
        message: "Document sign",
        description: "Please enter the address of your beneficiary",
      });
    else if (signature === null || signature.length === 0)
      notification.error({
        message: "Document sign",
        description: "Please sign the document to continue",
      });
    else showModal();
  };

  const docData = (doc) => {
    setDocSign({ ...doc });
  };

  return (
    <div className="colored-bg">
      <Modal
        title="Please confirm these detail before you continue"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="text-base">
          <p>
            <b>Next of kin</b> : {docSign.nok}
          </p>
          <p>
            <b>Relationship with next of kin</b> : {docSign.nok_relationship}
          </p>
          <p>
            <b>Address of next of kin</b> : {docSign.nok_address}
          </p>
          <br />
          <p>
            <b>Beneficiary</b> : {docSign.beneficiary}
          </p>
          <p>
            <b>Relationship with Beneficiary</b> :{" "}
            {docSign.beneficiary_relationship}
          </p>
          <p>
            <b>Address of the Beneficiary</b> : {docSign.beneficiary_address}
          </p>

          <br />
          <p className="my-4">Signature</p>
          {signature && signature.length > 0 && (
            <img className="h-16" src={signature} alt="Signature" />
          )}
        </div>
      </Modal>

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

                    <div className="grid max-w-5xl gap-10 mx-auto my-12 md:grid-cols-2">
                      <div>
                        <div className="flex justify-center">
                          <p className="px-8 py-1.5 text-white rounded-t-lg main-bg">
                            Selected
                          </p>
                        </div>
                        <div className="overflow-hidden bg-white rounded-2xl unit-selected">
                          <UnitCell unit={unit} clamp={false} />
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
                                {user.nok !== undefined && user.nok !== null
                                  ? "Continue to Payment"
                                  : "Continue to Signature"}
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

                      <form onSubmit={onSubmit}>
                        <div className="flex mt-10 overflow-hidden border">
                          {/* <div className="w-64 min-w-64">
                      <div className="p-5 text-xl font-semibold text-white border border-b-2 main-bg border-b-blue-400">
                        <p>Pieme Contracts</p>
                      </div>
                      <div className="h-full p-3 bg-white">
                        <p>Contracts</p>
                      </div>
                    </div> */}

                          <LoadDocument
                            unit={unit}
                            user={user}
                            amount={invest}
                            cValue={cValue}
                            docData={docData}
                            addSignature={addSignature}
                          />
                        </div>

                        <div className="flex justify-end p-2 bg-white">
                          <button
                            type="submit"
                            className="px-10 py-3 text-sm text-white rounded-md main-bg"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {current === 3 && (
                  <div className="max-w-3xl mx-auto">
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

                    <h3 className="pb-3 mt-3 text-xl text-center md:text-2xl heading-color">
                      Select your payment method:
                    </h3>

                    <Collapse
                      accordion
                      defaultActiveKey={["1"]}
                      items={payments}
                      expandIconPosition="end"
                      bordered={false}
                    />
                  </div>
                )}

                {current > 1 && (
                  <div className="max-w-4xl mx-auto mt-4">
                    <button
                      className="flex items-center gap-3 px-4 py-2.5 rounded-md text-white main-bg"
                      onClick={() => prev()}
                    >
                      <FaArrowLeft />
                      <p>Previous</p>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function BankPayment({ invest, user }) {
  return (
    <div className="text-base">
      <h3 className="font-medium">Due to be paid by bank transfer:</h3>
      <p>${numberFormatter(invest)}</p>

      <div className="p-4 my-5 text-white rounded-lg main-bg">
        <h3 className="font-semibold">
          Important! If this information is not correct, you may miss out of
          this investment opportunity
        </h3>
        <p className="my-3">
          - Ensure the name on the bank account sending the funds matches your
          Pieme account name
        </p>
        <p>
          - Funds received from a bank account not belonging to you will either
          be returned or will require a new Pieme account and ID verification
        </p>
        <p className="mt-3">
          - Please note the payment reference accurately as any mistakes will
          delay the investment process. It can take 3-5 business days for your
          investment to clear. Once the funds are received, we will notify you
          by email.
        </p>
      </div>

      <p>
        Transfers are credited on a first-come-first-served basis so if your
        funds are received after the property is fully funded, we will credit
        them to your Pieme wallet.
      </p>
      <p className="mt-3">
        Please note: Any funds transferred to Pieme and not invested within 21
        days will be returned to the sender. Any funds returned to investors may
        incur additional bank charges.
      </p>

      <h3 className="my-3 text-lg font-semibold main-color">
        Domestic transfer from a US bank
      </h3>
      <p>
        Beneficiary: Pie Tech Limited
        <br />
        Routing number: 026073150
        <br />
        Account number: 822000855459
        <br />
        SWIFT: CMFGUS33
        <br />
        Currency: USD
        <br />
        Account type: Checking account
        <br />
        Payment reference: {user.enc_id}
      </p>
    </div>
  );
}

export default PropertyInvest;
