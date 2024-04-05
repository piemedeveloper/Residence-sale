import React from "react";

import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

function InPress() {
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

  const logos = [
    "https://www.bricksave.com/static/website/images/media-logos/BBC.png?1617962484",
    "https://www.bricksave.com/static/website/images/media-logos/ElCronista.png?1617962484",
    "https://www.bricksave.com/static/website/images/media-logos/Forbes.png?1617962484",
    "https://www.bricksave.com/static/website/images/media-logos/Infobae.png?1617962484",
    "https://www.bricksave.com/static/website/images/media-logos/Clarin.png?1617962484",
  ];
  return (
    <div className="container py-12 mx-auto">
      <h2 className="text-4xl font-semibold text-center heading-color">
        Pieme in the press
      </h2>

      <Swiper
        spaceBetween={1}
        loop={true}
        modules={[Autoplay, Pagination, Navigation, A11y]}
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
        pagination={{ clickable: true }}
        className="mt-10"
      >
        {logos.map((logo, i) => (
          <SwiperSlide key={i}>
            <div>
              <img src={logo} alt="press logos" className="h-20" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default InPress;
