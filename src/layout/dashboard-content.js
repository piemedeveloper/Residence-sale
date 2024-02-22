import React from "react";
import Header from "./dashboard-header";
import { Outlet, useNavigate } from "react-router-dom";
import postData from "../hooks/useFetch";
import { removeToken } from "../utils/useToken";

function DashboardContent() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    postData({
      service: "get_profile",
      data: {},
    }).then((data) => {
      if (data.success !== 1) {
        removeToken();
        navigate("/");
      } else setUser({ ...data.data });
    });

    // eslint-disable-next-line
  }, []);

  return (
    <>
      {Object.keys(user).length > 0 && (
        <div>
          <Header />
          <div className="pt-20 gray-bg">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardContent;
