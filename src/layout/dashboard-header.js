import React from "react";
import logo from "../assets/images/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { CiGift } from "react-icons/ci";
import { BsGraphUp } from "react-icons/bs";
import { BsMenuUp } from "react-icons/bs";
import { TiThMenu } from "react-icons/ti";
import { TbHomeStats } from "react-icons/tb";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { IoIosNotificationsOutline } from "react-icons/io";
import { BsWallet2 } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";

import { Drawer, Dropdown, Modal } from "antd";
import { removeToken } from "../utils/useToken";

const { confirm } = Modal;

function Header() {
  let navigate = useNavigate();
  const [active, setActive] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const icon_class = "";
  const menu = [
    {
      icon: <BsMenuUp className={icon_class} />,
      label: "Summary",
      url: "/dashboard",
    },
    {
      icon: <TbHomeStats className={icon_class} />,
      label: "My Investments",
      url: "/dashboard/investments",
    },
    {
      icon: <IoHomeOutline className={icon_class} />,
      label: "Residences",
      url: "/dashboard/residences",
    },
    {
      icon: <CiGift className={`${icon_class} text-xl`} />,
      label: "Rewards",
      url: "/dashboard/rewards",
    },
    // {
    //   icon: <FaRegFileLines className={icon_class} />,
    //   label: "Documents",
    //   url: "documents",
    // },
  ];

  const logout = () => {
    confirm({
      title: "Are you sure you want to logout?",
      icon: <ExclamationCircleOutlined />,
      content: "When you click 'ok' you will be logged out automatically",
      onOk() {
        removeToken();
        navigate("/");
        window.location.reload(false);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
    // removeToken
  };
  const side_menu = [
    {
      icon: <IoIosNotificationsOutline className={`text-white text-2xl`} />,
      items: [],
    },
    {
      icon: <BsWallet2 className={`text-white text-xl`} />,
      items: [
        {
          key: "1",
          label: <Link to="/dashboard">Wallet</Link>,
        },
      ],
    },
    {
      icon: <FaRegUser className={`text-white text-xl`} />,
      items: [
        {
          key: "2",
          label: <button onClick={logout}>Logout</button>,
        },
      ],
    },
  ];

  let location = useLocation();
  React.useEffect(() => {
    setActive(location.pathname.substring(1));
    window.scrollTo({ behavior: "smooth", top: 0 });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="sticky top-0 z-50 w-full main-bg">
      <Drawer title="Pieme" placement={"right"} onClose={onClose} open={open}>
        <div className="text-lg text-black">
          {menu.map((m, i) => (
            <Link to={m.url} key={i} onClick={onClose}>
              <div className={`mt-3 ms-3`}>
                <p className="uppercase text-[12.5px] font-medium tracking-wider line-clamp-1">
                  {m.label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Drawer>
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div className="flex gap-3">
            <Link to="/">
              <div className="flex items-center py-2">
                <img src={logo} alt="Pieme logo" className="h-12" />
                {/* <h1 className="text-3xl text-white ms-1">Pieme</h1> */}
              </div>
            </Link>

            <div className="hidden lg:flex">
              {menu.map((m, i) => (
                <Link to={m.url} key={i}>
                  <div
                    className={`h-full flex items-center px-4 ${
                      "/" + active === m.url ? "active-link" : "inactive-link"
                    }  transform transition-all duration-300 gap-2`}
                  >
                    {/* {m.icon} */}
                    <p className="text-[0.9rem] tracking-wider line-clamp-1">
                      {m.label}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            {side_menu.map((m, i) => (
              <Dropdown
                key={i}
                menu={{
                  items: m.items,
                }}
                trigger={["click"]}
              >
                <div className="flex items-center h-full px-3.5 cursor-pointer">
                  {m.icon}
                </div>
              </Dropdown>
            ))}
            <div className="lg:hidden">
              <TiThMenu
                className={`${icon_class} text-3xl cursor-pointer`}
                onClick={showDrawer}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
