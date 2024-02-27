import React from "react";
import FaqData from "./faq-data";
import { Helmet } from "react-helmet";

function Faq() {
  const page = {
    title: "Frequently asked questions",
    image: "https://pieme.info/images/logoblue.png",
    description:
      "Consider some of the frequently asked questions about Pieme and Pieme Residences",
  };

  return (
    <div>
      <Helmet>
        <title>{page.title}</title>
        <meta name="title" content={page.title} />
        <meta name="description" content={page.description} />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.description} />

        <meta
          property="og:image"
          content={page.image}
          data-react-helmet="true"
        />

        <meta name="twitter:title" content={page.title} />
        <meta name="twitter:description" content={page.description} />
        <meta
          name="twitter:image"
          content={page.image}
          data-react-helmet="true"
        />
        <meta
          name="twitter:card"
          content={page.image}
          data-react-helmet="true"
        />
      </Helmet>

      <FaqData />
    </div>
  );
}

export default Faq;
