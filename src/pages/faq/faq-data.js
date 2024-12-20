import React, { useCallback, useState } from "react";

import { Collapse, Panel } from "antd";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import terms from "../../assets/General Questions and Answers about Pieme Residences.pdf";
import {
  FaqIndex1,
  FaqIndex2,
  FaqIndex3,
  FaqIndex4,
  FaqIndex5,
  FaqIndex6,
  FaqIndex7,
  FaqIndex8,
  FaqIndex9,
} from "./data-content";
import { useResizeObserver } from "@wojtekmaj/react-hooks";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

const maxWidth = 1000;

function FaqData() {
  const [containerWidth, setContainerWidth] = useState();
  const [numPages, setNumPages] = useState();
  const [containerRef, setContainerRef] = useState(null);

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

  const items = [
    {
      key: "1",
      label:
        "What is Pieme Residences, and what differentiates it from other investment opportunities?",
      children: <FaqIndex1 />,
    },
    {
      key: "2",
      label: "How does Pieme Residences incorporate blockchain technology into its model?",
      children: <FaqIndex2 />,
    },
    {
      key: "3",
      label:
        "Is Pieme Residences a completely new concept, or are there similar projects globally?",
      children: <FaqIndex3 />,
    },
    {
      key: "4",
      label:
        "What problem does Pieme Residences solve in the real estate or hospitality industry?",
      children: <FaqIndex4 />,
    },
    {
      key: "5",
      label: "How many units have been built so far and how many are currently available for investment?",
      children: <FaqIndex5 />,
    },
    {
      key: "6",
      label: "What is the minimum and maximum investment amount for Pieme Residences?",
      children: <FaqIndex6 />,
    },
    {
      key: "7",
      label: "What is the expected return on investment (ROI)?",
      children: <FaqIndex7 />,
    },
    {
      key: "8",
      label: "How often will investors receive dividends or profits?",
      children: <FaqIndex8 />,
    },
    {
      key: "9",
      label: "Are there any guarantees on the profitability of the investment?",
      children: <FaqIndex9 />,
    },
  ];

  return (
    <div className="pb-10 gray-bg">
      <div className="container mx-auto">
        <h1 className="pt-10 pb-6 text-5xl font-medium text-center heading-color">
          Frequently asked questions
        </h1>


        <div className="mx-auto mt-10" ref={setContainerRef}>
          <Document
            file={terms}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                className={"home-property mb-8"}
                width={
                  containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
                }
              />
            ))}
          </Document>
        </div>

        {/* <div className="grid gap-10 mx-auto lg:grid-cols-2">
          <Collapse
            accordion
            items={items}
            defaultActiveKey={["1"]}
            expandIconPosition="end"
            bordered={false}
          />
          <Collapse
            accordion
            items={items}
            expandIconPosition="end"
            bordered={false}
          />
        </div> */}

      </div>
    </div>
  );
}

export default FaqData;
