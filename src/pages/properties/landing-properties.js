import React from "react";
import { Link } from "react-router-dom";
import HomePropertyCell from "../home/home-property-cell";
import postData from "../../hooks/useFetch";
import { getToken } from "../../utils/useToken";
import { Helmet } from "react-helmet";

function LandingProperties() {
  document.title = "Residences";
  const [residences, setResidences] = React.useState([]);
  React.useEffect(() => {
    postData({
      service: "residences",
      data: {},
    }).then((data) => {
      if (data.success === 1) {
        setResidences(data.data);
      }
    });
  }, []);

  const page = {
    title: "Our Residences for Investment",
    image:
      "https://pieme.info/static/media/residence.6d38ffd4baa354fef0ea.jpeg",
    description: "Check out Our Residences for Investment",
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

      <div className="max-w-3xl px-2 py-12 mx-auto text-center heading-color">
        <h1 className="text-4xl font-semibold">
          Our Residences for Investment
        </h1>
        {getToken().length === 0 && (
          <p className="mt-4 text-lg">
            <Link to="/login">
              <span className="font-medium main-color">Login</span>
            </Link>{" "}
            or{" "}
            <Link to="/signup">
              <span className="font-medium main-color">register</span>
            </Link>{" "}
            to view full portfolio of residences available
          </p>
        )}
      </div>

      <div className="container grid gap-6 pb-16 mx-auto mt-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {residences.map((residence, i) => (
          <HomePropertyCell key={i} residence={residence} />
        ))}
      </div>
    </div>
  );
}

export default LandingProperties;
