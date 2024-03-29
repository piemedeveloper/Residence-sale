import { Progress } from "antd";
import React from "react";
import { Link } from "react-router-dom";

import { Navigation, Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { numberFormatter } from "../../utils/utils";

function ResidenceUnitCell({ unit }) {
  return (
    <Link
      to={`${
        unit.amount > 0 && unit.amount === unit.cost
          ? `/dashboard/unit/${unit.enc_id}`
          : `/dashboard/residences/invest/${unit.enc_id}`
      }`}
    >
      <div className="group">
        <div className="relative overflow-hidden rounded-xl">
          {unit.amount > 0 && unit.amount === unit.cost ? (
            <div
              className={`z-10 w-full h-full absolute top-0 bg-blue-600/10 backdrop-brightness-[60%] flex items-center justify-center`}
            >
              <div className="text-xl font-medium text-center text-white uppercase">
                <p>Fully funded</p>
              </div>
            </div>
          ) : (
            <div
              className={`z-10 w-full h-full absolute hidden top-0 bg-green-600/10 backdrop-brightness-[60%] items-center justify-center group-hover:flex duration-300 transition`}
            >
              <p className="px-8 text-sm text-white rounded-full main-bg py-2.5">
                Invest Now
              </p>
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
                    className="object-cover w-full h-full aspect-[4/3] group-hover:scale-110 transition duration-500"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="px-1">
          <h3 className="pt-2 text-lg font-medium">{unit.name}</h3>
          <Progress
            percent={parseFloat((unit.amount / unit.cost) * 100).toFixed(2)}
          />
          <div className="flex justify-between mb-2 text-sm">
            <div>
              <p className="head-color">Investor(s)</p>
              <p className="font-medium main-color">
                {numberFormatter(unit.investors)}
              </p>
            </div>
            <div>
              <p className="head-color text-end">Target</p>
              <div className="flex gap-3">
                {unit.original_cost !== unit.cost && (
                  <p className="font-medium text-red-500 line-through">
                    ${numberFormatter(unit.original_cost)}
                  </p>
                )}
                <p className="font-medium main-color text-end">
                  ${numberFormatter(unit.cost)}
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm line-clamp-3 menu-color">{unit.description}</p>
        </div>
      </div>
    </Link>
  );
}

export default ResidenceUnitCell;
