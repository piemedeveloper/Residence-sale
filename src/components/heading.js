import React from "react";

function Heading(props) {
  const { title, description } = props;

  return (
    <div>
      <h2 className="mb-2 text-3xl font-bold">{title}</h2>
      <p>{description}</p>
    </div>
  );
  return (
    <div className="mx-auto">
      <h1 className="text-3xl text-center md:text-4xl main-color">{title}</h1>
      {description.length > 0 && (
        <p className="max-w-2xl mx-auto mt-6 text-xl text-center head-color">
          {description}
        </p>
      )}
    </div>
  );
}

export default Heading;
