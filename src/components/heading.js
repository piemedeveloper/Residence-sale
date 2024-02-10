import React from "react";

function Heading(props) {
  const { title, description } = props;
  return (
    <div className="mx-auto ">
      <h1 className="text-4xl text-center md:text-5xl main-color">{title}</h1>
      {description.length > 0 && (
        <p className="max-w-2xl mx-auto mt-6 text-xl text-center head-color md:text-2xl">
          {description}
        </p>
      )}
    </div>
  );
}

export default Heading;
