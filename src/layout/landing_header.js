import React from "react";
import logo from "../assets/logoblue.png";
import _ from "lodash";
import { Link, useLocation } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { Drawer, Dropdown } from "antd";
import { TiArrowSortedDown } from "react-icons/ti";

function LandingHeader() {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState("");

  let location = useLocation();
  React.useEffect(() => {
    setActive(location.pathname.substring(1));
    window.scrollTo({ behavior: "smooth", top: 0 });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const menu = [
    { label: "Home", url: "", links: [] },
    { label: "How it works", url: "how-it-works", links: [] },
    { label: "Properties", url: "properties", links: [] },
    {
      label: "About",
      url: "about team",
      links: [
        { label: "About Pieme", url: "about" },
        { label: "Meet the team", url: "team" },
      ],
    },
    { label: "Questions", url: "faq", links: [] },
  ];

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Drawer title="Pieme" placement={"right"} onClose={onClose} open={open}>
        <p>dfghjk</p>
      </Drawer>
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container relative flex items-center justify-center mx-auto lg:justify-between">
          <Link to="/">
            <div className="relative flex items-center gap-1 my-3">
              <img src={logo} alt="Logo" className="h-11" />
              <h1 className="text-3xl font-medium main-color">Pieme</h1>
            </div>
          </Link>

          <div className="hidden gap-6 lg:flex">
            {_.map(menu, (m, i) => {
              const items = _.map(m.links, (link, l) => {
                return {
                  key: l + 1,
                  label: <Link to={`/${link.url}`}>{link.label}</Link>,
                };
              });
              return m.links.length > 0 ? (
                <Dropdown
                  key={i}
                  menu={{
                    items,
                  }}
                  arrow
                >
                  <div
                    className={`flex items-center p-5 menu-color hover:text-black cursor-pointer gap-2 ${
                      active.length > 0 && m.url.includes(active)
                        ? "active-menu"
                        : ""
                    }`}
                  >
                    <p className="h-full">{m.label}</p>
                    <TiArrowSortedDown />
                  </div>
                </Dropdown>
              ) : (
                <Link key={i} to={`/${m.url}`}>
                  <p
                    className={`h-full p-5 menu-color hover:text-black ${
                      (active.length === 0 && m.url === active) ||
                      (active.length > 0 && m.url.includes(active))
                        ? "active-menu"
                        : ""
                    }`}
                  >
                    {m.label}
                  </p>
                </Link>
              );
            })}
          </div>

          <Link to={"/login"} className="hidden lg:block">
            <p className="font-medium rounded-full login-btn">
              Login / Register
            </p>
          </Link>

          <div className="absolute left-6 lg:hidden">
            <IoMenu className="text-4xl head-color" onClick={showDrawer} />
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingHeader;
