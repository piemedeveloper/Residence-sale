import { FaArrowLeft } from "react-icons/fa";
import { Steps, message, Collapse, notification } from "antd";
import React, { useState } from "react";
import postData, { postDataAuth } from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import UnitCell from "../properties/unit-cell";
import { base_url, numberFormatter, url_gen } from "../../utils/utils";
import _, { ceil } from "lodash";
import { Spin, Modal } from "antd";
import jsPDF from "jspdf";

import axios from "axios";
import CryptoPayments from "../properties/crypto/crypto-payments";
import Contract from "../documents/contract";
import UnitSelected from "./unit-selected";
import MobileMoneyPayment from "../properties/mobile-money-payment";
import BankPaymentInitiate from "./bank-payment-initiate";

function PropertyInvest({ user }) {
  let location = useLocation();
  const [pid, setPid] = React.useState("");
  const [unit, setUnit] = useState({});
  const [cValue, setCValue] = useState(0);
  const [disable, setDisable] = useState(false);
  const [invest, setInvest] = useState(150);
  const [signature, setSignature] = useState(null);
  const [docSign, setDocSign] = useState({});
  const [pdfDoc, setPdfDoc] = useState(null);
  document.title = "Investment";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);

    setDisable(true);
    exportPdf();
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

  const next = () => {
    // if (current === 1 && user.nok !== undefined && user.nok !== null)
    //   setCurrent(current + 2);
    // else
    setCurrent(current + 1);
  };

  const amountSet = (amount) => {
    setInvest(amount);
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
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
        ceil(parseFloat(invest) * 0.03) + parseFloat(invest)
      )}`,
    },
  ];
  const payments = [
    {
      key: "1",
      label: "Mobile Money Payment (For Ugandan Investors only)",
      children: (
        <MobileMoneyPayment
          cValue={cValue}
          invest={invest}
          unit={unit}
          docSign={docSign}
          to_pay={to_pay}
          pdfDoc={pdfDoc}
        />
      ),
    },
    {
      key: "2",
      label: "Crypto Currency Payment",
      children: (
        <CryptoPayments
          to_pay={to_pay}
          invest={invest}
          unit={unit}
          pdfDoc={pdfDoc}
        />
      ),
    },
    {
      key: "3",
      label: "Pay with bank transfer",
      children: <div>
        <BankPaymentInitiate user={user} to_pay={to_pay}
          invest={invest}
          unit={unit}
          pdfDoc={pdfDoc}
          cValue={cValue} />
      </div>,
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
              data: {
                nok: docSign.nok,
                nok_relationship: docSign.nok_relationship,
                nok_address: docSign.nok_address,
                beneficiary: docSign.beneficiary,
                beneficiary_relationship: docSign.beneficiary_relationship,
                beneficiary_address: docSign.beneficiary_address,
                signature: docSign.signature,
              },
            }).then((data) => {
              setDisable(false);
              if (data.success === 1) {
                message.success("Document signed");
                next();
              } else message.error(data.message);
            });
          }
        })
        .catch((err) => {
          setDisable(false);
        });
    } else {
      //if no file selected the show alert
      alert("Please Select File first");
      setDisable(false);
    }
  };

  const exportPdf = () => {
    const component = document.querySelector("#capture");

    component.style.width = "210mm";

    var doc = new jsPDF("p", "pt", "a4");
    let srcwidth = component.scrollWidth;
    doc.html(component, {
      html2canvas: {
        scale: 600 / srcwidth,
      },
      x: 0,
      y: 0,
      callback: function (doc) {
        component.style.width = "100%";
        const pdfDoc = doc.output("blob");
        const formData = new FormData();
        const docFile = new File(
          [pdfDoc],
          url_gen(`${user.username} ${unit.name} contract.pdf`),
          {
            type: pdfDoc.type,
          }
        );

        formData.append("file", docFile);

        axios
          .post(`${base_url}file_upload`, formData)
          .then((res) => {
            if (res.data.status === 1) {
              setPdfDoc(res.data.data[res.data.data.length - 1]);
              uploadImage();
            }
          })
          .catch((error) => {
            setDisable(false);
          });
      },
    });
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
    <div className="">
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

      <div className="container mx-auto">
        <div>
          <div className="max-w-5xl mx-auto">
            <Steps current={current} items={items} />
          </div>

          <div className="my-12">
            {Object.keys(unit).length > 0 && (
              <div>
                {current === 1 && <UnitSelected unit={unit} next={amountSet} />}

                {current === 2 && (
                  <div>
                    <div className="max-w-4xl mx-auto">
                      <h2 className="text-xl text-center heading-color">
                        You are investing{" "}
                        <span className="font-medium">
                          ${numberFormatter(invest)}
                        </span>{" "}
                        in <span className="font-medium">{unit.name}</span> at
                        Pieme{" "}
                        <span className="font-medium">{unit.residence}</span>{" "}
                        Residence
                      </h2>

                      <h3 className="mt-3 text-xl text-center heading-color">
                        Please sign the document below:
                      </h3>

                      <form onSubmit={onSubmit}>
                        <div className="flex mt-10 overflow-hidden border">
                          <Contract
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
                            disabled={disable}
                            className="flex items-center gap-2 px-10 py-3 text-sm text-white rounded-md main-bg"
                          >
                            {disable && <Spin />}
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {current === 3 && (
                  <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl text-center md:text-2xl heading-color">
                      You are investing{" "}
                      <span className="font-medium">
                        ${numberFormatter(invest)}
                      </span>{" "}
                      in <span className="font-medium">{unit.name}</span> at
                      Pieme{" "}
                      <span className="font-medium">{unit.residence}</span>{" "}
                      Residence
                    </h2>

                    <h3 className="pb-3 mt-3 text-xl text-center heading-color">
                      Select your payment method:
                    </h3>

                    <div className="p-8 gray-bg">
                      <Collapse
                        accordion
                        defaultActiveKey={["1"]}
                        items={payments}
                        expandIconPosition="end"
                        bordered={false}
                      />
                    </div>
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
