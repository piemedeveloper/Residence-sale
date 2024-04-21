import React from "react";
import { Link } from "react-router-dom";
import HomePropertyCell from "./home-property-cell";

import { Navigation, A11y, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import postData from "../../hooks/useFetch";

function StartPortfolio() {
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

  const [residences, setResidences] = React.useState([]);
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

  return (
    <div className="gray-bg">
      <div className="container py-16 mx-auto">
        <h2 className="max-w-xl mx-auto text-3xl font-semibold text-center md:text-4xl heading-color">
          Commence Your Hotel Business Journey Today
        </h2>

        <Swiper
          spaceBetween={1}
          modules={[Autoplay, Navigation, A11y]}
          slidesPerView={
            windowSize[0] < 1100
              ? windowSize[0] < 1024
                ? windowSize[0] < 768
                  ? windowSize[0] < 600
                    ? 1.2
                    : 1.5
                  : 2.2
                : 2.8
              : 3.8
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
  );
}

export default StartPortfolio;
