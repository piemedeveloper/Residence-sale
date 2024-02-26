import React from "react";
import FaqData from "./faq-data";
import { Helmet } from "react-helmet";

function Faq() {
  document.title = "Faq | Pieme";
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Frequently asked questions</title>
        <meta
          name="description"
          content={
            "Consider some of the frequently asked questions about Pieme and Pieme Residences"
          }
        />
        <meta property="og:title" content="Frequently asked questions" />
        <meta
          property="og:description"
          content={
            "Consider some of the frequently asked questions about Pieme and Pieme Residences"
          }
        />
      </Helmet>
      <FaqData />
    </div>
  );
}

export default Faq;
