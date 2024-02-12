import React from "react";
import _ from "lodash";
import { Link, useLocation } from "react-router-dom";
import { how_it_works } from "../../utils/data";
import { Markup } from "interweave";

function HowItWorksDetails() {
  let location = useLocation();
  const [pid, setPid] = React.useState("");
  const [data, setData] = React.useState({});

  const getData = (id) => {
    const p = _.filter(how_it_works, { slag: id });
    if (p.length !== 0) {
      setData({ ...p[0] });
      document.title = p[0].title + " | Pieme";
    }
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    let id = location.pathname.substring(1);
    id = id.length > 1 ? id.split("/")[0] : "";
    if (pid !== id) {
      setPid(id);
      getData(id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className="mx-auto">
      {Object.keys(data).length === 0 ? (
        <div className="py-12 text-center heading-color">
          <h2 className="py-3 text-4xl font-semibold">404 - Page not found</h2>
          <p>
            Unfortunately the page you are trying to reach could not be found.
          </p>
        </div>
      ) : (
        <div>
          <div className="gray-bg">
            <div className="container pt-12 pb-4 mx-auto">
              <h1 className="max-w-2xl mx-auto text-4xl font-semibold text-center md:text-5xl heading-color">
                {data.title}
              </h1>

              <img
                src={data.photo}
                alt={data.title}
                className="object-cover w-full my-10 max-h-96"
              />
            </div>
          </div>

          <div className="container flex gap-10 py-12 mx-auto">
            <div className="w-2/3 text-lg menu-color">
              <h2 className="mb-4 text-4xl font-semibold heading-color">
                {data.title}
              </h2>
              <div className="how-detail">
                <Markup content={data.desc} />
              </div>
            </div>
            <div className="w-1/3">
              <div className="sticky overflow-hidden border rounded-lg home-property top-20">
                <p className="p-4 border-b gray-bg">
                  Learn more about Pieme Residences
                </p>
                <div className="p-4">
                  {how_it_works.map((h, i) => (
                    <Link to={`/${h.slag}`} key={i}>
                      <p className="my-3 heading-color">{h.title}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HowItWorksDetails;
