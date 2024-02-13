import React from "react";
import { Link } from "react-router-dom";
import HomePropertyCell from "../home/home-property-cell";
import postData from "../../hooks/useFetch";

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

  return (
    <div>
      <div className="max-w-3xl px-2 py-12 mx-auto text-center heading-color">
        <h1 className="text-5xl font-semibold">Our Investment Residences</h1>
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
      </div>

      <div className="container grid gap-10 pb-16 mx-auto mt-3 md:grid-cols-2 lg:grid-cols-3">
        {residences.map((residence, i) => (
          <HomePropertyCell key={i} residence={residence} />
        ))}
      </div>
    </div>
  );
}

export default LandingProperties;
