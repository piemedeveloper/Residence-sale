import React, { useState } from "react";
import { numberFormatter } from "../../utils/utils";
import { ceil } from "lodash";
import mtn from "../../assets/images/mtn-logo.png";

import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { Spin, message, notification } from "antd";
import { useNavigate } from "react-router-dom";
import postData from "../../hooks/useFetch";

function MobileMoneyPayment({ cValue, invest, unit, docSign, to_pay, pdfDoc, commitment }) {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [countDown, setCountDown] = useState(false);

  const [btnDis, setBtnDis] = useState(false);

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
          contract: pdfDoc,
          "is_commitment": commitment
        },
      }).then((data) => {
        setBtnDis(false);
        console.log(data)
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

  return (
    <div>
      {ceil(
        parseFloat(cValue) *
        (parseFloat(invest) + parseFloat(invest) * 0.03)
      ) <= 5000000 ?
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
        </div> : <div>
          <p className="pb-2 mt-2 text-xl font-semibold main-color">
            UGX.{" "}
            {numberFormatter(
              ceil(
                parseFloat(cValue) *
                (parseFloat(invest) + parseFloat(invest) * 0.03)
              )
            )}
          </p>
          <p className="text-base font-medium">Mobile money payment is inactive: Amount Exceeds 5M</p>
        </div>}
    </div>
  );
}

export default MobileMoneyPayment;
