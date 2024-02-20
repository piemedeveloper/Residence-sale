import React from "react";
import Heading from "../../components/heading";
import SummaryContainer from "../../components/summary-container";
import residence from "../../assets/residence.jpeg";
import Info from "../../components/info";
import postData from "../../hooks/useFetch";
import InvestedUnitCell from "./invested-unit-cell";

function Investments({ user }) {
  document.title = "Investments | Pieme";
  const [units, setUnits] = React.useState([]);

  React.useEffect(() => {
    postData({
      service: "my_investments",
      data: {},
    }).then((data) => {
      if (data.success === 1) {
        setUnits(data.data);
      }
    });
  }, []);
  return (
    <div className="mx-auto my-14 container-box">
      <Heading title="Investments" description="" />
      <br />

      {units.length > 0 ? (
        <div className="pt-4">
          <div className="grid gap-6 pb-10 mx-auto sm:grid-cols-2 lg:grid-cols-3">
            {units.map((unit, i) => (
              <InvestedUnitCell key={i} unit={unit} />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-lg text-center">You have not invested yet</p>
      )}

      <SummaryContainer
        bg={residence}
        title={`${user.first_name}, don't miss out on the current available opportunities`}
        link="/dashboard/residences"
        label="View availble opportunities"
      />

      <div className="bg-white rounded-xl">
        <Info desc="The value of any investment can decrease as well as increase due to market fluctuations and other external factors. Forecasts are only estimates and are not reliable." />
      </div>
    </div>
  );
}

export default Investments;
