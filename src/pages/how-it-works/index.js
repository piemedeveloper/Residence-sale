import React from "react";
import { low_investment } from "../../utils/data";
import InsightCell from "../home/insight-cell";
import { Link } from "react-router-dom";
import WhyInvest from "./why-invest";
import PiemeProcess from "./pieme-process";

function HowItWorks() {
  const how = [
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

  return (
    <div>
      <div className="max-w-3xl text-center mx-auto px-2 py-12 heading-color">
        <h1 className="text-5xl font-semibold">
          How Real Estate Crowdfunding Works
        </h1>
        <p className="text-lg mt-4">
          Earn average annual returns of 9% from as little as {low_investment}{" "}
          in the world's strongest currencies*
        </p>
      </div>

      <div className="pb-6 container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-3">
        {how.map((h, i) => (
          <InsightCell key={i} data={h} />
        ))}
      </div>

      <div className="flex justify-center mb-10">
        <Link>
          <p className="mt-20 text-center register-btn">
            Take a look at our investment properties
          </p>
        </Link>
      </div>

      <WhyInvest />

      <div className="gray-bg pb-10">
        <div className="max-w-3xl text-center mx-auto px-2 py-12 heading-color">
          <h1 className="text-5xl font-semibold">
            Investments designed for you
          </h1>
          <p className="text-lg mt-4">
            Our crowdfunding platform is designed for all investors. Simple,
            accessible and hassle-free investing from {low_investment}.
          </p>
        </div>

        <div className="pb-6 container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-3">
          {how.slice(0, 3).map((h, i) => (
            <InsightCell key={i} data={h} />
          ))}
        </div>
      </div>

      <PiemeProcess />
    </div>
  );
}

export default HowItWorks;
