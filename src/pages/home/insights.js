import React from "react";

import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import InsightCell from "./insight-cell";
import { how_it_works } from "../../utils/data";

function Insights() {
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

  // const insights = [
  //   {
  //     title: "Lorem ipsum dolor sit amet, consectetur",
  //     photo:
  //       "https://e1.pxfuel.com/desktop-wallpaper/145/234/desktop-wallpaper-3-hiking.jpg",
  //     desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //   },
  //   {
  //     title: "Lorem ipsum dolor sit amet, consectetur",
  //     photo: "https://images.alphacoders.com/435/435793.jpg",
  //     desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //   },
  //   {
  //     title: "Lorem ipsum dolor sit amet, consectetur",
  //     photo:
  //       "https://img.freepik.com/premium-photo/people-wallking-blurred-background-wallpaper_846066-14.jpg",
  //     desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //   },
  //   {
  //     title: "Lorem ipsum dolor sit amet, consectetur",
  //     photo:
  //       "https://media.istockphoto.com/id/635887100/id/video/orang-orang-kerumunan-pembeli-high-street-yang-tidak-dapat-diubah-hari.jpg?b=1&s=640x640&k=20&c=5Z-qwk0zvcyriBKz8qGvvbm0f5bntVwZHBvVMczELa8=",
  //     desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //   },
  // ];

  return (
    <div className="gray-bg">
      <div className="container py-12 mx-auto">
        <h3 className="max-w-2xl mx-auto text-4xl font-medium text-center main-color">
          How Pieme Community Hotel Ownership works
        </h3>

        <Swiper
          spaceBetween={1}
          modules={[Autoplay, Pagination, Navigation, A11y]}
          slidesPerView={
            windowSize[0] < 1050
              ? windowSize[0] < 750
                ? windowSize[0] < 600
                  ? 1.2
                  : 1.5
                : 2.2
              : 3.2
          }
          navigation
          pagination={{ clickable: true }}
          className="mt-10"
        >
          {how_it_works.map((f, i) => (
            <SwiperSlide key={i}>
              <div className="mb-10 ms-3 me-4">
                <InsightCell data={f} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* <h3 className="mt-4 text-4xl font-medium text-center main-color">
          Latest hotel room investment insight
        </h3>

        <Swiper
          spaceBetween={1}
          modules={[Autoplay, Pagination, Navigation, A11y]}
          slidesPerView={
            windowSize[0] < 1050
              ? windowSize[0] < 750
                ? windowSize[0] < 600
                  ? 1.1
                  : 1.5
                : 2.1
              : 3.1
          }
          navigation
          pagination={{ clickable: true }}
          className="mt-10"
        >
          {insights.map((f, i) => (
            <SwiperSlide key={i}>
              <div className="mb-10 ms-3 me-4">
                <InsightCell data={f} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper> */}
      </div>
    </div>
  );
}

export default Insights;
