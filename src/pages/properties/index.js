import React from "react";
import { low_investment } from "../../utils/data";
import PropertyCell from "./property-cell";
import Heading from "../../components/heading";
import Info from "../../components/info";
import postData from "../../hooks/useFetch";

function Properties() {
  document.title = "Residences | Pieme";
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
    <div className="mx-auto container-box py-14">
      <Heading
        title="Available residences for investment"
        description={`The easy to use, hassle-free way to build a global hotel room portfolio
        from as little as ${low_investment}`}
      />
      <div className="grid gap-8 mt-16 md:grid-cols-2 lg:grid-cols-3">
        {residences.map((residence, i) => (
          <PropertyCell key={i} residence={residence} />
        ))}
      </div>

      <Info
        desc="The value of any investment can decrease as well as increase due to
        market fluctuations and other external factors. Forecasts are only
        estimates and are not reliable."
      />
    </div>
  );
}

export default Properties;
