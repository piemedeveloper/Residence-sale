import React from "react";
import Header from "./dashboard-header";
import { Outlet, useNavigate } from "react-router-dom";
import postData from "../hooks/useFetch";
import { removeToken } from "../utils/useToken";

function DashboardContent() {
  const navigate = useNavigate();

  React.useEffect(() => {
    postData({
      service: "get_profile",
      data: {},
    }).then((data) => {
      if (data.success !== 1) {
        removeToken();
        navigate("/");
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Header />
      <div className="pt-20 gray-bg">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardContent;
