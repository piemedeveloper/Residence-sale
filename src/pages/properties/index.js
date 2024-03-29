import React from "react";
import { low_investment } from "../../utils/data";
import PropertyCell from "./property-cell";
import Heading from "../../components/heading";
import Info from "../../components/info";
import postData from "../../hooks/useFetch";
import { Spin } from "antd";

function Properties() {
  document.title = "Residences | Pieme";
  const [residences, setResidences] = React.useState({
    loading: false,
    data: [],
  });
  React.useEffect(() => {
    setResidences({ ...residences, ...{ loading: true } });
    postData({
      service: "residences",
      data: {},
    }).then((data) => {
      setResidences({ ...residences, ...{ loading: false } });
      if (data.success === 1) {
        setResidences({ ...residences, ...{ data: data.data } });
      }
    });
  }, []);

  return (
    <div className="container mx-auto">
      <Heading
        title="Available residences for investment"
        description={`The easy to use, hassle-free way to build a global hotel room portfolio
        from as little as ${low_investment}`}
      />
      {residences.loading && (
        <div className="loader">
          <Spin />
        </div>
      )}

      <div className="grid gap-5 mt-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {residences.data.map((residence, i) => (
          <PropertyCell key={i} residence={residence} />
        ))}
      </div>

      <Info desc="The income generated in Pieme Residences fluctuates depending on the season, similar to how the value of any investment can decrease as well as increase due to market fluctuations and other external factors. Forecasts regarding the income are only estimates and are not reliable." />
    </div>
  );
}

export default Properties;
