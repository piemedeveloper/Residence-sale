import React, { useState, useCallback, useRef } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import contract from "../../assets/images/contract.pdf";
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
import { base_url, formatDate, numberFormatter } from "../../utils/utils";
import { ceil } from "lodash";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.js",
//   import.meta.url
// ).toString();

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

const maxWidth = 1000;

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

function LoadDocument(props) {
  const unit = props.unit;
  const user = props.user;
  const amount = props.amount;

  const [docData, setDocData] = useState({
    nok: "",
    nok_relationship: "",
    nok_address: "",
    beneficiary: "",
    beneficiary_relationship: "",
    beneficiary_address: "",
  });

  React.useEffect(() => {
    props.docData(docData);
  }, [docData]);

  const sigPad = useRef();
  const [numPages, setNumPages] = useState();
  const [containerRef, setContainerRef] = useState(null);
  const [containerWidth, setContainerWidth] = useState();
  const [signature, setSignature] = useState(null);
  const [sign, setSign] = useState(false);
  const [tab, setTab] = React.useState("1");
  const [textSignature, setTextSignature] = useState(null);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

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

  const onResize = useCallback((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess(nextNumPages) {
    setNumPages(nextNumPages.numPages);
  }

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
      <div className="relative h-[50rem] w-full overflow-y-scroll gray-bg">
        <div>
          <div>
            <div ref={setContainerRef}>
              <Document
                file={contract}
                onLoadSuccess={onDocumentLoadSuccess}
                options={options}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    className={"home-property mb-8"}
                    width={
                      containerWidth
                        ? Math.min(containerWidth, maxWidth)
                        : maxWidth
                    }
                  >
                    <div className="text-sm">
                      {index === 0 && (
                        <>
                          <p className="document_date">
                            {formatDate(new Date())}
                          </p>

                          <p className="document_investor">
                            {user.first_name} {user.last_name}
                          </p>

                          <p className="document_unit">{unit.name}</p>
                        </>
                      )}

                      {index === 2 && (
                        <>
                          <p className="document_unit_price">
                            {numberFormatter(amount)}
                          </p>

                          <p className="document_unit_price_ugx">
                            {numberFormatter(ceil(props.cValue * amount))}
                          </p>

                          <p className="document_unit_percentage">
                            {parseFloat((amount / unit.cost) * 100).toFixed(2)}
                          </p>
                        </>
                      )}

                      {index === 6 && (
                        <>
                          <p className="document_investor_name">
                            {user.first_name} {user.last_name}
                          </p>

                          <input
                            type="text"
                            required
                            placeholder="Enter name"
                            value={docData.nok}
                            onChange={(e) => {
                              docData.nok = e.target.value;
                              setDocData({ ...docData });
                            }}
                            className="document_nok"
                          />

                          <input
                            type="text"
                            required
                            placeholder="Enter your relationship"
                            value={docData.nok_relationship}
                            onChange={(e) => {
                              docData.nok_relationship = e.target.value;
                              setDocData({ ...docData });
                            }}
                            className="document_nok_relationship"
                          />

                          <input
                            type="text"
                            required
                            placeholder="Enter the address"
                            value={docData.nok_address}
                            onChange={(e) => {
                              docData.nok_address = e.target.value;
                              setDocData({ ...docData });
                            }}
                            className="document_nok_address"
                          />

                          <input
                            type="text"
                            required
                            placeholder="Enter benefiary's name"
                            value={docData.beneficiary}
                            onChange={(e) => {
                              docData.beneficiary = e.target.value;
                              setDocData({ ...docData });
                            }}
                            className="document_beneficiary"
                          />

                          <input
                            type="text"
                            required
                            placeholder="Enter relationship with benefiary"
                            value={docData.beneficiary_relationship}
                            onChange={(e) => {
                              docData.beneficiary_relationship = e.target.value;
                              setDocData({ ...docData });
                            }}
                            className="document_beneficiary_relationship"
                          />

                          <input
                            type="text"
                            required
                            placeholder="Enter benefiary's address"
                            value={docData.beneficiary_address}
                            onChange={(e) => {
                              docData.beneficiary_address = e.target.value;
                              setDocData({ ...docData });
                            }}
                            className="document_beneficiary_address"
                          />

                          <div className="document_signature">
                            <div
                              onClick={() => setSign(true)}
                              className="px-6 py-4 my-4 border-2 border-blue-500 cursor-pointer hover:border-blue-700"
                            >
                              {signature && signature.length > 0 ? (
                                <img
                                  className="h-16"
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
                        </>
                      )}
                    </div>
                  </Page>
                ))}
              </Document>
            </div>
          </div>
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

export default LoadDocument;
