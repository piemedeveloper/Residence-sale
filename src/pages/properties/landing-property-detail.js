import React from "react";
import { Link, useLocation } from "react-router-dom";
import _ from "lodash";
import HomePropertyCell from "../home/home-property-cell";
import { getToken } from "../../utils/useToken";
import postData from "../../hooks/useFetch";
// import UnitCell from "./unit-cell";
import NotFunding from "./not-funding";
import ResidenceUnitCell from "./residence-unit-cell";

function LandingPropertyDetail() {
  let location = useLocation();
  const [pid, setPid] = React.useState("");
  const [residence, setResidence] = React.useState({});
  const [residences, setResidences] = React.useState([]);
  const [units, setUnits] = React.useState([]);

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
        setUnits(data.data.units);
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
    <div className="py-10 gray-bg">
      <NotFunding residence={residence} />

      {getToken().length > 0 && units.length > 0 && (
        <div className="py-10 bg-white">
          <h2 className="container max-w-2xl mx-auto mb-10 text-3xl font-medium text-center md:text-4xl heading-color">
            Available units at Pieme Residence
            <br /> {residence.name}
          </h2>
          <div className="container grid grid-cols-1 gap-8 mx-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {_.map(units, (unit, i) => (
              <ResidenceUnitCell key={i} unit={unit} />
            ))}
          </div>

          {/* <div className="container grid gap-6 pb-10 mx-auto sm:grid-cols-2 lg:grid-cols-3">
            {_.map(units, (unit, i) => (
              <UnitCell key={i} unit={unit} invest={true} clamp={true} />
            ))}
          </div> */}
        </div>
      )}

      <div className="py-12 bg-white">
        <div className="container mx-auto text-lg text-center">
          <h2 className="mb-3 text-3xl font-semibold text-center heading-color">
            Other available Investment Opportunities
          </h2>
          <p className="menu-color">
            View the latest hotel room investment opportunities in different
            Pieme Residences
          </p>

          {getToken().length === 0 && (
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
          )}
        </div>

        <div className="container grid gap-6 pb-16 mx-auto mt-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {_.filter(residences, (p) => p.slag !== pid).map((residence, i) => (
            <HomePropertyCell key={i} residence={residence} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPropertyDetail;
