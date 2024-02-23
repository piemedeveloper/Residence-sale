import React, { useState, useCallback } from "react";

import { pdfjs, Document, Page } from "react-pdf";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import terms from "../../assets/terms-and-conditions.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

const maxWidth = 1000;

function TermsAndConditions() {
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

  return (
    <div className="container mx-auto mt-10" ref={setContainerRef}>
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
  );
}

export default TermsAndConditions;
