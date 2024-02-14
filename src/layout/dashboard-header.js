import React from "react";
import logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { FaWallet } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { CiGift } from "react-icons/ci";
import { BsGraphUp } from "react-icons/bs";
import { BsMenuUp } from "react-icons/bs";
import { TiThMenu } from "react-icons/ti";

import { IoNotifications } from "react-icons/io5";
import { Dropdown } from "antd";

function Header() {
  const [active, setActive] = React.useState("");
  const icon_class = "text-white";
  const menu = [
    {
      icon: <BsMenuUp className={icon_class} />,
      label: "Summary",
      url: "/dashboard",
    },
    {
      icon: <BsGraphUp className={icon_class} />,
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

  const side_menu = [
    {
      icon: <IoNotifications className={`${icon_class} text-2xl`} />,
      items: [
        {
          key: "1",
          label: (
            <a target="_blank" rel="noopener noreferrer" href="">
              1st menu item
            </a>
          ),
        },
        {
          key: "2",
          label: (
            <a target="_blank" rel="noopener noreferrer" href="">
              2nd menu item
            </a>
          ),
        },
      ],
    },
    {
      icon: <FaWallet className={`${icon_class} text-2xl`} />,
      items: [
        {
          key: "1",
          label: (
            <a target="_blank" rel="noopener noreferrer" href="">
              1st menu item
            </a>
          ),
        },
        {
          key: "2",
          label: (
            <a target="_blank" rel="noopener noreferrer" href="">
              2nd menu item
            </a>
          ),
        },
      ],
    },
    {
      icon: <FaUser className={`${icon_class} text-2xl`} />,
      items: [
        {
          key: "2",
          label: (
            <a target="_blank" rel="noopener noreferrer" href="">
              Logout
            </a>
          ),
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

  return (
    <div className="fixed z-50 w-full main-bg">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <Link to="/">
            <div className="flex items-center py-2.5">
              <img src={logo} alt="Pieme logo" className="h-12" />
              <h1 className="text-3xl text-white ms-1">Pieme</h1>
            </div>
          </Link>

          <ul className="hidden lg:flex">
            {menu.map((m, i) => (
              <li key={i}>
                <Link to={m.url}>
                  <div
                    className={`h-full flex items-center px-6 ${
                      "/" + active === m.url ? "active-link" : "link-hover"
                    }  transform transition-all duration-300 gap-2`}
                  >
                    {m.icon}
                    <p className="uppercase text-[12.5px] font-medium tracking-wider text-white line-clamp-1">
                      {m.label}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center">
            {side_menu.map((m, i) => (
              <Dropdown
                key={i}
                menu={{
                  items: m.items,
                }}
              >
                <div className="flex items-center h-full px-3.5 cursor-pointer">
                  {m.icon}
                </div>
              </Dropdown>
            ))}
            <div className="lg:hidden">
              <TiThMenu className={`${icon_class} text-3xl`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
