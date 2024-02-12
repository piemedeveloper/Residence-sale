import React from "react";
import { Link } from "react-router-dom";

function InsightCell(props) {
  const data = props.data;

  return (
    <div className="relative pb-12 overflow-hidden bg-white home-property rounded-xl ">
      <Link to={`/${data.title}`}>
        <div className="relative h-52 sm:h-60">
          <img
            src={data.photo}
            alt={data.title}
            className="object-cover w-full h-full"
          />
        </div>
      </Link>

      <div className="p-6">
        <h2 className="font-medium main-color">{data.title}</h2>

        <p
          className={`mt-4 mb-3 text-base heading-color ${
            data.title > 40 ? "line-clamp-8" : "line-clamp-6"
          }`}
        >
          {data.desc}
        </p>
      </div>

      <div className="absolute bottom-0 w-full p-3 border-t">
        <Link to={`/`}>
          <p className="text-base font-medium text-center entire-color">
            Read more
          </p>
        </Link>
      </div>
    </div>
  );
}

export default InsightCell;
