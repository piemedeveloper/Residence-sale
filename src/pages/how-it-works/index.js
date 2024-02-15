import React from "react";
import { how_it_works, low_investment } from "../../utils/data";
import InsightCell from "../home/insight-cell";
import { Link } from "react-router-dom";
import WhyInvest from "./why-invest";
import PiemeProcess from "./pieme-process";
import HomePropertyCell from "../home/home-property-cell";

import { Navigation, A11y, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import postData from "../../hooks/useFetch";

function HowItWorks() {
  const [residences, setResidences] = React.useState([]);
  document.title = "How Pieme works";
  React.useEffect(() => {
    postData({
      service: "residences",
      data: {},
    }).then((data) => {
      if (data.success === 1) {
        setResidences(data.data);
      }
    });
  }, []);

  const [windowSize, setWindowSize] = React.useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  React.useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  return (
    <div>
      <div className="max-w-3xl px-2 py-12 mx-auto text-center heading-color">
        <h1 className="text-5xl font-semibold">
          How Pieme Community Hotel Ownership works
        </h1>
        <p className="mt-4 text-lg">
          Earn average annual returns of 30% from as little as {low_investment}{" "}
          in both Fiat and Crypto Currencies
        </p>
      </div>

      <div className="container grid gap-10 pb-6 mx-auto mt-3 md:grid-cols-2 lg:grid-cols-3">
        {how_it_works.map((h, i) => (
          <InsightCell key={i} data={h} />
        ))}
      </div>

      <div className="flex justify-center mb-10">
        <Link to="/residences">
          <p className="mt-20 text-center register-btn">
            Take a look at our Residences
          </p>
        </Link>
      </div>

      <WhyInvest />

      <div className="pb-10 gray-bg">
        <div className="max-w-3xl px-2 py-12 mx-auto text-center heading-color">
          <h1 className="text-5xl font-semibold">
            Pieme Residences designed for you to Invest
          </h1>
          <p className="mt-4 text-lg">
            Our crowdfunding platform is designed for all investors. Simple,
            accessible and hassle-free investing from {low_investment}.
          </p>
        </div>

        <div className="container mx-auto">
          <Swiper
            spaceBetween={1}
            modules={[Autoplay, Navigation, A11y]}
            slidesPerView={
              windowSize[0] < 1050
                ? windowSize[0] < 800
                  ? windowSize[0] < 600
                    ? 1.1
                    : 1.5
                  : 2.1
                : 3.1
            }
            navigation
            className="mt-10"
          >
            {residences.map((residence, i) => (
              <SwiperSlide key={i}>
                <div className="mb-10 me-8">
                  <HomePropertyCell residence={residence} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <PiemeProcess />
    </div>
  );
}

export default HowItWorks;
