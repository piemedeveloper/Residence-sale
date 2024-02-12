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

  const how_it_works = [
    {
      title: "What is Hotel Community ownership?",
      photo:
        "https://img.freepik.com/free-photo/autumn-leaf-falling-revealing-intricate-leaf-vein-generated-by-ai_188544-9869.jpg",
      desc: "Hotel Community Ownership refers to a unique concept where a community collectively owns or invests in a hotel property. Instead of traditional ownership models where a single entity or a group of investors own the entire hotel, community ownership involves a broader group of individuals or stakeholders who own independent hotel rooms, and share ownership rights and responsibilities.",
    },
    {
      title: "Community vs Traditional Hotel Ownership",
      photo:
        "https://images.unsplash.com/photo-1610085927744-7217728267a6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnVsbCUyMGhkJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww",
      desc: "A Community-Owned Hotel involves diverse local stakeholders collectively owning and making decisions for the hotel, fostering community engagement and reinvesting profits locally. In contrast, traditional ownership models are typically centralized, owned by a single entity or investor group, with decision-making and benefits focused on profitability rather than community involvement. Community-owned hotels prioritize sustainability, aligning with local values, while profits are shared among stakeholders. Traditional models may lack this emphasis on community-driven values and shared prosperity, making the community-owned approach a more inclusive and locally focused alternative.",
    },
    {
      title: "How do Pieme residences work",
      photo:
        "https://t3.ftcdn.net/jpg/05/71/06/04/360_F_571060419_Owx0HieYkYocICzV4W7IxmXpdmP1xo7F.jpg",
      desc: "Pieme Residences, a pioneering initiative by Pie Tech Limited, operates as community-owned hotel apartments leveraging Blockchain technology. The process begins with meticulous location research, land acquisition, and an open invitation for individuals to invest in and own specific hotel units (Rooms). Investors become stakeholders in the project, benefiting from shared profits.",
    },
    {
      title: "What are the advantages of investing in Pieme Residences",
      photo:
        "https://play-lh.googleusercontent.com/GD78NlC-yoQXcLsvTc3JLr_VVR5YKQp43FOfWLB7e5lwU_La_hy4olpMaj0_yY7ScgQ",
      desc: "Investing in Pieme Residences offers several advantages, emphasizing ease of expansion into other countries and the diversification of capital across various residences:",
    },

    {
      title: "“I can afford to build an entire hotel alone”",
      photo:
        "https://play-lh.googleusercontent.com/GD78NlC-yoQXcLsvTc3JLr_VVR5YKQp43FOfWLB7e5lwU_La_hy4olpMaj0_yY7ScgQ",
      desc: "Having the financial capacity to independently build a hotel is commendable, however, investing in Pieme Residences offers unique advantages, including risk diversification. Unlike owning a hotel in one location and country, which concentrates risk, Pieme Residences allows investors to spread their capital across multiple residences and projects to be built across Africa.",
    },
    {
      title: "Disadvantages of investing in community-owned Hotels",
      photo:
        "https://play-lh.googleusercontent.com/GD78NlC-yoQXcLsvTc3JLr_VVR5YKQp43FOfWLB7e5lwU_La_hy4olpMaj0_yY7ScgQ",
      desc: "Community-owned hotels may pose challenges such as complex decision-making processes, potential disagreements among stakeholders, and limited control for individual investors. Profit distribution might be subject to community agreements, impacting personal returns. Additionally, community projects may face slower decision implementation, and conflicts could arise due to differing investor priorities and expectations.",
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
                  ? 1.1
                  : 1.5
                : 2.1
              : 3.1
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
