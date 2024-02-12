import React from "react";
import residences from "../../assets/residences.jpeg";
// import { FaRegBuilding, FaAward, FaHome } from "react-icons/fa";
// import { TbZoomMoney } from "react-icons/tb";
// import { low_investment } from "../../utils/data";
import jei from "../../assets/jei.jpeg";
import lydia from "../../assets/lydia.jpeg";

function Investing() {
  const testimonials = [
    {
      photo: jei,
      message:
        "Pieme takes care of everything tedious about real estate investment: formalities, insurance, maintenance, tenants, etc. The variety of properties allows diversification which gives me greater peace of mind. The process is really simple - you can keep track of your investments anytime, anywhere.",
      name: "Jei Rahman",
    },

    {
      photo: lydia,
      message:
        "I've been impressed with Pieme from the very beginning. The investing process was made clear and simple through the website and there is always excellent support available. I strongly recommend them.",
      name: "Asiimwe Lydia",
    },
  ];

  // const invest = [
  //   {
  //     icon: <FaRegBuilding className={`text-3xl heading-color`} />,
  //     label: "Institutional: Bespoke investment opportunities",
  //   },
  //   {
  //     icon: <FaAward className={`text-3xl heading-color`} />,
  //     label: "Available: Manage your investments 24/7, wherever you are",
  //   },
  //   {
  //     icon: <FaHome className={`text-3xl heading-color`} />,
  //     label: "Accessible: Invest from as little as " + low_investment,
  //   },
  //   {
  //     icon: <TbZoomMoney className={`text-3xl heading-color`} />,
  //     label: "Transparent: No hidden fees",
  //   },
  // ];
  return (
    <div
      className="bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${residences})` }}
    >
      <div className="container relative py-12 mx-auto heading-color">
        <h1 className="relative text-4xl font-bold text-center text-white md:text-5xl">
          Investing with Pieme
        </h1>

        <div className="relative grid gap-8 mt-10 mb-10 lg:grid-cols-2">
          {testimonials.map((t, i) => (
            <div key={i} className="flex gap-4 p-5 bg-white rounded-xl">
              <img
                src={t.photo}
                alt="investing"
                className="w-12 h-12 rounded-full min-w-12"
              />
              <div>
                <p className="text-base">"{t.message}"</p>
                <p className="mt-2 text-xs">{t.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="relative grid p-5 mt-8 mb-10 bg-white gap-x-8 gap-y-4 lg:grid-cols-2 rounded-xl">
          {invest.map((i, p) => (
            <div key={p} className="flex items-center gap-4">
              <div className="flex">
                <div className="p-2.5 rounded-full invest-input">{i.icon}</div>
              </div>
              <p className="text-base">{i.label}</p>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}

export default Investing;
