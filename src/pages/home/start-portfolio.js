import React from "react";
import { Link } from "react-router-dom";
import { properties } from "../../utils/data";
import HomePropertyCell from "./home-property-cell";

import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

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

  return (
    <div className="gray-bg">
      <div className="container py-12 mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-medium text-center md:text-4xl heading-color">
            Commence Your Hotel Business Journey Today
          </h2>

          <div className="flex justify-center pb-6 mt-8">
            <Link>
              <p className="mt-20 text-center register-btn">
                Register to view full property details
              </p>
            </Link>
          </div>

          <Swiper
            spaceBetween={1}
            modules={[Autoplay, Pagination, Navigation, A11y]}
            slidesPerView={
              windowSize[0] < 1050
                ? windowSize[0] < 750
                  ? windowSize[0] < 600
                    ? 1.1
                    : 1.5
                  : 2.05
                : 3.05
            }
            navigation
            pagination={{ clickable: true }}
            className="mt-10"
          >
            {properties.map((property, i) => (
              <SwiperSlide key={i}>
                <div className="mb-10 me-8">
                  <HomePropertyCell property={property} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default StartPortfolio;
