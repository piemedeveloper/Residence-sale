import React from "react";
import { Link } from "react-router-dom";
import { Markup } from "interweave";

function InsightCell(props) {
  const data = props.data;

  return (
    <div className="relative pb-6 overflow-hidden bg-white home-property rounded-xl ">
      <Link to={`/${data.slag}`}>
        <div className="relative">
          <img
            src={data.photo}
            alt={data.title}
            className="object-cover w-full aspect-[5/3]"
          />
        </div>
      </Link>

      <div className="p-4 text-[0.95rem] overflow-hidden min-h-64 max-h-64">
        <h2 className="font-semibold main-color">{data.title}</h2>

        <div
          className={`mt-4 mb-3 heading-color ${
            data.title > 40 ? "line-clamp-8" : "line-clamp-6"
          }`}
        >
          <Markup content={data.desc} />
        </div>
      </div>

      <div className="absolute bottom-0 w-full p-3 border-t">
        <Link to={`/${data.slag}`}>
          <p className="text-[0.95rem] font-medium text-center entire-color">
            Read more
          </p>
        </Link>
      </div>
    </div>
  );
}

export default InsightCell;
