import React, { useState, useRef } from "react";
import { formatDate } from "../../utils/utils";
import { Markup } from "interweave";
import k_signature from "../../assets/images/signature_image.png";
import { useSelector } from "react-redux";
import { user } from "../../features";

import { Tabs, message, Upload } from "antd";
import { IoIosCloseCircle } from "react-icons/io";
import SignatureCanvas from "react-signature-canvas";
import {
  EditOutlined,
  CloudUploadOutlined,
  FontColorsOutlined,
} from "@ant-design/icons";
import { text_to_signature } from "../../utils/data";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { base_url } from "../../utils/utils";
import { purpose, recitals } from "./data-content";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

function Contract(props) {
  const userData = useSelector(user.user);
  const unit = props.unit;
  const sigPad = useRef();
  const [signature, setSignature] = useState(null);
  const [sign, setSign] = useState(false);
  const [tab, setTab] = React.useState("1");
  const [textSignature, setTextSignature] = useState(null);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const [details, setDetails] = useState({
    date: formatDate(new Date()),
    name: `${userData.first_name} ${userData.last_name}`,
    unit: unit.name,
    cost: unit.cost,
    amount: props.amount,
    percentage: (
      (parseFloat(props.amount) / parseFloat(unit.cost)) *
      100
    ).toFixed(2),
    nok: userData.nok,
    nok_relationship: userData.nok_relationship,
    nok_address: userData.nok_address,
    beneficiary: userData.beneficiary,
    beneficiary_relationship: userData.beneficiary_relationship,
    beneficiary_address: userData.beneficiary_address,
  });

  React.useEffect(() => {
    props.docData(details);
    // eslint-disable-next-line
  }, [details]);

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const mySignature = () => {
    if (tab === "1")
      setSignature(sigPad.current.getTrimmedCanvas().toDataURL("image/png"));
    else if (tab === "2") setSignature(textSignature);
    else if (tab === "3") {
      setSignature(imageUrl);
    }
    setSign(false);
  };

  React.useEffect(() => {
    props.addSignature(signature);
    // eslint-disable-next-line
  }, [signature]);

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

          <p
            className="absolute px-4 py-2 text-sm text-white bg-red-500 rounded-md cursor-pointer top-2 right-10"
            onClick={() => {
              sigPad.current.clear();
            }}
          >
            Clear
          </p>
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
      children: (
        <div>
          <Upload
            name="image"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={base_url + "image_upload"}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: "100%",
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full">
      <div className="p-5 text-xl font-semibold bg-white border border-b-2 border-b-blue-400 main-color">
        <p>
          Binding Terms - {unit.name} at Pieme {unit.residence} Residence
        </p>
      </div>
      <div className="relative h-[50rem] w-full overflow-y-scroll bg-white">
        <div className="w-full mx-auto contract-doc" id="capture">
          <h1>SUB-PROJECT FUNDING AGREEMENT</h1>
          <p>
            This SUB-PROJECT FUNDING AGREEMENT (the "<b>Agreement</b>"), made
            this day of
            <b> {details.date}</b> (the "<b>Execution Date</b>"), is entered
            into between:
          </p>

          <h2>Parties</h2>
          <ol className="numbered">
            <li>
              <b>PIE TECH LIMITED</b> (Pieme Residences) (the "<b>Company</b>"),
              a Ugandan corporation of P.O.BOX 131257 Kampala GPO, with its
              principal executive offices at Kampala. <br />
              And
            </li>
            <li>
              <b>{details.name}</b> (the "<b>Investor</b>") Jointly and
              collectively hereinafter referred to as the "<b>PARTIES</b>".
            </li>
          </ol>

          <h2>Recitals</h2>
          <ol className="alphared">
            {recitals(details.unit).map((r, i) => (
              <li key={i}>
                <Markup content={r} />
              </li>
            ))}
          </ol>

          <p>
            NOW THEREFORE, in consideration of the foregoing recitals, which
            shall be considered an integral part of this Agreement, the
            covenants and agreements set forth hereafter, the Parties hereby
            agree as follows:
          </p>

          <div className="numbered-dot">
            <ol>
              {purpose(details).map((p, i) => (
                <li key={i}>
                  <h3>
                    <b>{p.menu}</b>
                  </h3>

                  {p.description.map((d, k) => (
                    <h6 key={k}>
                      <Markup content={d} />
                    </h6>
                  ))}

                  <ol>
                    {p.sub_menu.map((s, l) => (
                      <li ley={l}>
                        <h4>
                          <b>{s.title}</b>
                        </h4>
                        {s.description.map((d, k) => (
                          <p>
                            <Markup key={k} content={d} />
                          </p>
                        ))}
                      </li>
                    ))}
                  </ol>
                </li>
              ))}
            </ol>
          </div>

          <div className="mb-10 ms-14 user-details">
            <div>
              <p>
                <b>Next of Kin: </b>
              </p>
              <input
                type="text"
                required
                placeholder="Enter name"
                value={details.nok}
                onChange={(e) => {
                  details.nok = e.target.value;
                  setDetails({ ...details });
                }}
              />
            </div>

            <div>
              <p>
                <b>Relationship: </b>
              </p>
              <input
                type="text"
                required
                placeholder="Enter your relationship"
                value={details.nok_relationship}
                onChange={(e) => {
                  details.nok_relationship = e.target.value;
                  setDetails({ ...details });
                }}
              />
            </div>
            <div>
              <p>
                <b>Address</b>:
              </p>
              <input
                type="text"
                required
                placeholder="Enter the address"
                value={details.nok_address}
                onChange={(e) => {
                  details.nok_address = e.target.value;
                  setDetails({ ...details });
                }}
              />
            </div>
            <div className="mt-6">
              <p>
                <b>Beneficiary</b>:
              </p>
              <input
                type="text"
                required
                placeholder="Enter benefiary's name"
                value={details.beneficiary}
                onChange={(e) => {
                  details.beneficiary = e.target.value;
                  setDetails({ ...details });
                }}
              />
            </div>
            <div>
              <p>
                <b>Relationship</b>:
              </p>
              <input
                type="text"
                required
                placeholder="Enter relationship with benefiary"
                value={details.beneficiary_relationship}
                onChange={(e) => {
                  details.beneficiary_relationship = e.target.value;
                  setDetails({ ...details });
                }}
              />
            </div>
            <div>
              <p>
                <b>Address</b>:
              </p>
              <input
                type="text"
                required
                placeholder="Enter benefiary's address"
                value={details.beneficiary_address}
                onChange={(e) => {
                  details.beneficiary_address = e.target.value;
                  setDetails({ ...details });
                }}
              />
            </div>
          </div>

          <h4>
            IN WITNESS WHEREOF THIS AGREEMENT HAS BEEN ENTERED INTO ON THE DATE
            STATED AT THE BEGINNING OF IT.
          </h4>
          <h6>
            Company Representative Title: <b>CEO</b>
          </h6>
          <div className="flex items-baseline gap-3">
            <h6>Signature</h6>
            <img src={k_signature} alt="" className="h-10" />
          </div>
          <h6>
            Name: <b>KAINJA KULE JOSHUA</b>
          </h6>
          <h6>Date: {details.date}</h6>
          <h6>
            <b>Investor</b>
          </h6>
          <div className="flex items-center gap-2">
            <h6>Signature:</h6>
            <div>
              <div
                onClick={() => setSign(true)}
                className={`px-6 py-4 my-4 ${
                  signature && signature.length > 0
                    ? ""
                    : "border-2 border-blue-500 "
                }cursor-pointer hover:border-blue-700 hover:border-2`}
              >
                {signature && signature.length > 0 ? (
                  <img className="h-14" src={signature} alt="Signature" />
                ) : (
                  <div className="px-10 py-4 text-sm ">
                    <p>Click here to sign</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <h6>
            <b>Name</b>: {details.name}
          </h6>
          <h6>
            <b>Date</b>: {details.date}
          </h6>
        </div>
      </div>

      <div
        className={`z-10 absolute bottom-0 ${
          !sign && "hidden"
        } w-full bg-white border-t`}
      >
        <div className="flex items-center justify-between px-4 border-b">
          <p className="p-4 text-2xl ">Signature</p>
          <p onClick={() => setSign(false)}>
            <IoIosCloseCircle className="text-4xl text-red-600 cursor-pointer" />
          </p>
        </div>
        <div className="px-4">
          <Tabs defaultActiveKey="1" items={tabs} onChange={(t) => setTab(t)} />

          <div className="flex justify-end w-full gap-10 p-2 mt-4 text-sm border-t border-b signature-buttons">
            <p onClick={mySignature}>Confirm</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contract;
