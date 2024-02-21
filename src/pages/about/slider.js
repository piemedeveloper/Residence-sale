import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import residence from "../../assets/images/residence1.jpeg";
import residence1 from "../../assets/images/residence.jpeg";
import residence2 from "../../assets/images/residences.jpeg";
import parking from "../../assets/images/parking.jpeg";
import { Slide } from "react-awesome-reveal";

function Slider() {
  const images = [residence, residence1, residence2, parking];
  return (
    <div>
      <Slide direction="up" triggerOnce>
        <div className="max-w-lg mx-auto overflow-hidden border-8 border-white lg:max-w-2xl rounded-3xl">
          <Fade duration={2000}>
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="residence"
                className="object-cover w-full h-full"
              />
            ))}
          </Fade>
        </div>
      </Slide>
    </div>
  );
}

export default Slider;
