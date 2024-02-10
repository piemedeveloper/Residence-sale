import React from "react";
import ContentHeading from "../../components/content-heading";

function GraphSection() {
  return (
    <div className="flex flex-col w-full gap-6 mt-6 md:flex-row">
      <div className="w-full bg-white rounded-xl">
        <ContentHeading title="MONTHLY RENTAL RETURNS" />
        <div className="grid grid-cols-2 gap-6 p-5 sm:grid-cols-3">
          <p>ghjkl</p>
        </div>
      </div>
      <div className="w-full bg-white rounded-xl">
        <ContentHeading title="FUNDS" />
        <div className="grid grid-cols-2 gap-6 p-5 sm:grid-cols-3">
          <p>ghjkl</p>
        </div>
      </div>
    </div>
  );
}

export default GraphSection;
