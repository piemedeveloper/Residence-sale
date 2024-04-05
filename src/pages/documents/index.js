import React from "react";
import postData from "../../hooks/useFetch";
import Transactions from "../investments/transactions";
import Heading from "../../components/heading";

function Documents() {
  document.title = "Investments | Pieme";
  const [records, setRecords] = React.useState([]);

  React.useEffect(() => {
    postData({
      service: "my_investments",
      data: {},
    }).then((data) => {
      if (data.success === 1) {
        setRecords(data.records);
      }
    });
  }, []);

  return (
    <div className="container mx-auto">
      <Heading title="Contract Documents" description="" />
      {records.length > 0 && <Transactions records={records} />}
    </div>
  );
}

export default Documents;
