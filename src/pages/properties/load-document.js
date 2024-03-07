import React, { useState, useCallback, useRef } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import contract from "../../assets/contract.pdf";
import { Tabs, message, Upload } from "antd";
import { IoIosCloseCircle } from "react-icons/io";

import { useSelector } from "react-redux";
import { user } from "../../features";

import SignatureCanvas from "react-signature-canvas";

import {
  EditOutlined,
  CloudUploadOutlined,
  FontColorsOutlined,
} from "@ant-design/icons";
import { text_to_signature } from "../../utils/data";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { base_url, formatDate, numberFormatter } from "../../utils/utils";
import Contract from "../documents/contract";

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
  const userData = useSelector(user.user);
  const unit = props.unit;
  const amount = props.amount;

  const [docData, setDocData] = useState({
    nok: userData.nok,
    nok_relationship: userData.nok_relationship,
    nok_address: userData.nok_address,
    beneficiary: userData.beneficiary,
    beneficiary_relationship: userData.beneficiary_relationship,
    beneficiary_address: userData.beneficiary_address,
  });

  React.useEffect(() => {
    props.docData(docData);
    // eslint-disable-next-line
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
      <div className="relative h-[50rem] w-full overflow-y-scroll bg-white">
        <Contract />
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
