import React from "react";
import { IoInformationCircleOutline } from "react-icons/io5";

function Info(props) {
  return (
    <div className="flex items-center gap-4 px-4 py-3 my-6 border rounded-xl">
      <IoInformationCircleOutline className="text-7xl entire-color min-w-12" />
      <p className="header-color">{props.desc}</p>
    </div>
  );
}

export default Info;
