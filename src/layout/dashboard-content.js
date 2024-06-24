import React from "react";
import Header from "./dashboard-header";
import { Outlet, useNavigate } from "react-router-dom";
import postData from "../hooks/useFetch";
import { removeToken } from "../hooks/user-token";
import { useDispatch, useSelector } from "react-redux";
import { user, addUsers } from "../features";
import BankPay from "../pages/invest/bank-pay";

function DashboardContent() {
  const navigate = useNavigate();

  const userData = useSelector(user.user);
  const dispatch = useDispatch();


  React.useEffect(() => {
    postData({
      service: "get_profile",
      data: {},
    }).then((data) => {
      if (data.success !== 1) {
        removeToken();
        navigate("/");
      } else dispatch(addUsers.user(data.data));
    });

    // eslint-disable-next-line
  }, []);



  return (
    <div>
      <Header />
      <div className="relative py-10 gray-bg">
        <Outlet />
        <BankPay />
      </div>
    </div>
  );
}

export default DashboardContent;
