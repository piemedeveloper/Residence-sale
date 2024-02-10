import React from "react";
import pieme_p from "../../assets/pieme-process.png";
import { Slide } from "react-awesome-reveal";

function PiemeProcess() {
  const process = [
    "Pieme selects a property",
    "New unique company (SVP) created to buy and manage the property",
    "Investors own % share of SVP",
    "Rental returns are immediately passed to investors",
    "At the end of the investment period the property is sold",
    "Pieme investors receive their share of the profits",
    "Investors have option to re-invest",
  ];
  return (
    <div
      className="bg-no-repeat bg-right py-16 pieme-process"
      style={{ backgroundImage: `url(${pieme_p})` }}
    >
      <Slide direction="left" triggerOnce>
        <div className="container mx-auto">
          <h2 className="heading-color mb-8 text-4xl font-semibold text-center">
            The Pieme process
          </h2>

          {process.map((p, i) => (
            <div key={i} className="menu-color md:text-lg mb-4 flex gap-3">
              <div>
                <p className="invest-input rounded-full heading-color px-2 font-medium">
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
