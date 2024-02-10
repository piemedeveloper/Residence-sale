import React from "react";

function ContentHeading(props) {
  return (
    <p className="p-5 text-xs font-semibold uppercase border-b main-color">
      {props.title}
    </p>
  );
}

export default ContentHeading;
