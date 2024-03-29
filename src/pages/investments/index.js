import React from "react";
import Heading from "../../components/heading";
import SummaryContainer from "../../components/summary-container";
import residence from "../../assets/images/residence.jpeg";
import Info from "../../components/info";
import postData from "../../hooks/useFetch";
import InvestedUnitCell from "./invested-unit-cell";
import Transactions from "./transactions";
import { useSelector } from "react-redux";
import { user } from "../../features";

function Investments() {
  document.title = "Investments | Pieme";
  const [units, setUnits] = React.useState([]);
  const [records, setRecords] = React.useState([]);

  const userData = useSelector(user.user);

  React.useEffect(() => {
    postData({
      service: "my_investments",
      data: {},
    }).then((data) => {
      if (data.success === 1) {
        setUnits(data.data);
        setRecords(data.records);
      }
    });
  }, []);
  return (
    <div className="container mx-auto">
      <Heading title="My Investments" description="" />

      {units.length > 0 ? (
        <div className="pt-4">
          <div className="grid gap-6 pb-10 mx-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {units.map((unit, i) => (
              <InvestedUnitCell key={i} unit={unit} />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-lg text-center">You have not invested yet</p>
      )}

      {records.length > 0 && <Transactions records={records} />}

      <SummaryContainer
        bg={residence}
        title={`${userData.first_name}, don't miss out on the current available opportunities`}
        link="/dashboard/residences"
        label="View availble opportunities"
      />

      <div className="bg-white rounded-xl">
        <Info desc="The income generated in Pieme Residences fluctuates depending on the season, similar to how the value of any investment can decrease as well as increase due to market fluctuations and other external factors. Forecasts regarding the income are only estimates and are not reliable." />
      </div>
    </div>
  );
}

export default Investments;
