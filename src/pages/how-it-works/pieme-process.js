import React from "react";
import pieme_p from "../../assets/images/pieme-process.png";
import { Slide } from "react-awesome-reveal";

function PiemeProcess() {
  const process = [
    "Conduct research",
    "Identify land for purchase",
    "Start construction",
    "Invite investors",
    "Share revenue",
  ];
  return (
    <div
      className="py-16 bg-right bg-no-repeat pieme-process"
      style={{ backgroundImage: `url(${pieme_p})` }}
    >
      <Slide direction="left" triggerOnce>
        <div className="container mx-auto">
          <h2 className="mb-8 text-4xl font-semibold text-center heading-color">
            The Pieme process
          </h2>

          {process.map((p, i) => (
            <div key={i} className="flex gap-3 mb-4 menu-color md:text-lg">
              <div>
                <p className="px-2 font-medium rounded-full invest-input heading-color">
                  {i + 1}
                </p>
              </div>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </Slide>
    </div>
  );
}

export default PiemeProcess;
