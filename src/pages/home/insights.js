import React from "react";

import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import InsightCell from "./insight-cell";

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

  const funding = [
    {
      title: "Lorem ipsum dolor sit amet, consectetur",
      photo:
        "https://img.freepik.com/free-photo/autumn-leaf-falling-revealing-intricate-leaf-vein-generated-by-ai_188544-9869.jpg",
      desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur",
      photo:
        "https://images.unsplash.com/photo-1610085927744-7217728267a6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnVsbCUyMGhkJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww",
      desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur",
      photo:
        "https://t3.ftcdn.net/jpg/05/71/06/04/360_F_571060419_Owx0HieYkYocICzV4W7IxmXpdmP1xo7F.jpg",
      desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur",
      photo:
        "https://play-lh.googleusercontent.com/GD78NlC-yoQXcLsvTc3JLr_VVR5YKQp43FOfWLB7e5lwU_La_hy4olpMaj0_yY7ScgQ",
      desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];

  const insights = [
    {
      title: "Lorem ipsum dolor sit amet, consectetur",
      photo:
        "https://e1.pxfuel.com/desktop-wallpaper/145/234/desktop-wallpaper-3-hiking.jpg",
      desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur",
      photo: "https://images.alphacoders.com/435/435793.jpg",
      desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur",
      photo:
        "https://img.freepik.com/premium-photo/people-wallking-blurred-background-wallpaper_846066-14.jpg",
      desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      title: "Lorem ipsum dolor sit amet, consectetur",
      photo:
        "https://media.istockphoto.com/id/635887100/id/video/orang-orang-kerumunan-pembeli-high-street-yang-tidak-dapat-diubah-hari.jpg?b=1&s=640x640&k=20&c=5Z-qwk0zvcyriBKz8qGvvbm0f5bntVwZHBvVMczELa8=",
      desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];

  return (
    <div className="gray-bg">
      <div className="container py-12 mx-auto">
        <h3 className="text-4xl font-medium text-center main-color">
          How real estate crowdfunding works
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
          {funding.map((f, i) => (
            <SwiperSlide key={i}>
              <div className="mb-10  ms-3 me-4">
                <InsightCell data={f} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <h3 className="mt-4 text-4xl font-medium text-center main-color">
          Latest real estate investment insight
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
              <div className="mb-10  ms-3 me-4">
                <InsightCell data={f} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Insights;
