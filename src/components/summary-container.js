import React from "react";
import { Link } from "react-router-dom";

function SummaryContainer(props) {
  const { bg, title, label, link } = props;
  return (
    <div className="relative mt-6 overflow-hidden rounded-lg">
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="absolute w-full h-full bg-fixed bg-center bg-no-repeat bg-cover"
      ></div>
      <div className="relative px-4 py-16 text-white bg-blue-500/70">
        <p className="text-2xl text-center">{title}</p>
        <div className="flex justify-center mt-6">
          <Link to={link}>
            <p className="px-16 py-3 text-base duration-300 transform border-2 border-white rounded-full hover:bg-white hover:text-black">
              {label}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SummaryContainer;
