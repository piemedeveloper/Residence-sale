import React, { useState } from "react";
import { postDataAuth } from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import UnitSelected from "../invest/unit-selected";
import { Spin } from "antd";

function UnitDetails() {
  const [unit, setUnit] = useState({});
  const [pid, setPid] = React.useState("");

  let location = useLocation();

  const getUnit = (id) => {
    postDataAuth({
      service: "get_acc_view",
      data: { id },
    }).then((data) => {
      if (data.success === 1) {
        setUnit(data.data);
      }
    });
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    let id = location.pathname.substring(1);
    id = id.length > 1 ? id.split("/")[id.split("/").length - 1] : "";
    if (pid !== id) {
      setPid(id);
      getUnit(id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className="container mx-auto">
      {Object.keys(unit).length === 0 ? (
        <div className="flex justify-center loader">
          <Spin size="large" />
        </div>
      ) : (
        <UnitSelected unit={unit} />
      )}
    </div>
  );
}

export default UnitDetails;
