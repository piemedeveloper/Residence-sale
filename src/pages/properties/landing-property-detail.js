import React from "react";
import { Link, useLocation } from "react-router-dom";
import _ from "lodash";
import { Progress } from "antd";
import { numberFormatter } from "../../utils/utils";
import HomePropertyCell from "../home/home-property-cell";
import { getToken } from "../../utils/useToken";
import postData from "../../hooks/useFetch";

function LandingPropertyDetail() {
  let location = useLocation();
  const [pid, setPid] = React.useState("");
  const [residence, setResidence] = React.useState({});
  const [residences, setResidences] = React.useState([]);

  const getResidences = () => {
    postData({
      service: "residences",
      data: {},
    }).then((data) => {
      if (data.success === 1) {
        setResidences(data.data);
      }
    });
  };

  const getProperty = (id) => {
    postData({
      service: "residence",
      data: { slag: id },
    }).then((data) => {
      if (data.success === 1) {
        setResidence(data.data.residence);
      }
    });
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    let id = location.pathname.substring(1);
    id = id.length > 1 ? id.split("/")[1] : "";
    if (pid !== id) {
      setPid(id);
      getProperty(id);
    }

    getResidences();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className="gray-bg">
      {Object.keys(residence).length > 0 && (
        <div className="container py-10 mx-auto ">
          <div className="text-center heading-color">
            <h1 className="mb-3 text-5xl font-semibold">{residence.name}</h1>
            <p className="text-lg">{residence.location}</p>
          </div>

          <div className="flex gap-2 mt-10">
            <Link to="/residences">
              <p className="main-color">Residences</p>
            </Link>
            <p>
              {">"} {residence.location}
            </p>
          </div>

          <div className="flex flex-col gap-8 p-4 mt-4 bg-white lg:flex-row rounded-xl home-property">
            <div className="w-full lg:w-2/5 h-60 max-h-60">
              <img
                src={residence.image}
                alt={residence.location}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="relative w-full lg:w-3/5">
              <div className="relative grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-sm uppercase menu-color">
                    EST. ANNUAL RETURN
                  </p>
                  <h3 className="text-base font-semibold heading-color">
                    {residence.annual_yield}%
                  </h3>
                </div>
                <div>
                  <p className="text-sm uppercase menu-color">
                    Est. annual income
                  </p>
                  <h3 className="text-base font-semibold heading-color">
                    $
                    {numberFormatter(
                      (residence.annual_yield / 100) * residence.price
                    )}
                  </h3>
                </div>
                <div>
                  <p className="text-sm uppercase menu-color">
                    INVESTMENT TYPE
                  </p>
                  <h3 className="text-base font-semibold heading-color">
                    Croudfunding
                  </h3>
                </div>
                <div>
                  <p className="text-sm uppercase menu-color">PROPERTY TYPE</p>
                  <h3 className="text-base font-semibold heading-color">
                    Hotel room
                  </h3>
                </div>
              </div>

              <div className="relative bottom-0 w-full mt-8 lg:mt-0 lg:absolute">
                <Progress
                  percent={parseInt((residence.paid / residence.price) * 100)}
                />
                <div className="flex justify-between text-base">
                  <p className="menu-color">TARGET</p>
                  <p className="font-semibold heading-color">
                    ${numberFormatter(residence.price)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {getToken().length === 0 && (
            <div className="flex justify-center mt-4">
              <Link to="/login">
                <p className="mt-20 text-center register-btn">
                  Login / Sign up to view more information
                </p>
              </Link>
            </div>
          )}
        </div>
      )}

      <div className="py-12 bg-white">
        <div className="container mx-auto text-lg text-center">
          <h2 className="mb-3 text-4xl font-semibold text-center heading-color">
            Other available Investment Opportunities
          </h2>
          <p className="menu-color">
            View the latest hotel room investment opportunities in different
            Pieme Residences
          </p>

          <p className="mt-4">
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

        <div className="container grid gap-8 pb-16 mx-auto mt-10 md:grid-cols-2 lg:grid-cols-3">
          {_.filter(residences, (p) => p.slag !== pid).map((residence, i) => (
            <HomePropertyCell key={i} residence={residence} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPropertyDetail;
