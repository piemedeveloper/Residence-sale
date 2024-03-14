import React from "react";
import { Link } from "react-router-dom";

import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

function ResidenceUnitCell({ unit }) {
  return (
    <Link to={`/dashboard/residences/invest/${unit.enc_id}`}>
      <div>
        <div className="relative overflow-hidden rounded-xl">
          {unit.amount > 0 && unit.amount === unit.cost && (
            <div
              className={`z-10 w-full h-full absolute top-0 bg-blue-600/20 backdrop-brightness-[60%] flex items-center justify-center`}
            >
              <div className="text-xl font-medium text-center text-white uppercase md:text-2xl">
                <p>Fully funded</p>
              </div>
            </div>
          )}
          <div className="relative z-0">
            <Swiper
              loop={true}
              modules={[Pagination, Navigation, A11y]}
              pagination={{ clickable: true }}
            >
              {unit.images.map((image, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={image}
                    alt={unit.location}
                    className="object-cover w-full h-full aspect-[8/7]"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <p>Unit</p>
      </div>
    </Link>
  );
}

export default ResidenceUnitCell;
