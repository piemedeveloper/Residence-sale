import React, { useState } from "react";
import { low_investment } from "../../utils/data";
import NumericInput from "react-numeric-input";
import { Progress, Slider, Row, Col } from "antd";
import { numberFormatter } from "../../utils/utils";
import _ from "lodash";

import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

function importAll(r) {
  let images = {};
  // eslint-disable-next-line array-callback-return
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(
  require.context("../../assets/images/icons", false, /\.(png|jpe?g|svg)$/)
);

function UnitSelected({ unit, next }) {
  const [invest, setInvest] = useState(150);

  const offers = [
    {
      title: "What this place offers",
      items: unit.amenities,
      icons: {
        1: images["pool.png"],
        2: images["bathtub.png"],
        3: images["bbq.png"],
        4: images["fire-place.png"],
        5: images["parking.png"],
        6: images["gym.png"],
      },
    },
    {
      title: "Safety and security",
      items: unit.safety,
      icons: {
        1: images["smoke-alarm.png"],
        2: images["first-aid.png"],
        3: images["detector.png"],
        4: images["extinguisher.png"],
      },
    },
    {
      title: "House Rules",
      items: unit.rules,
      icons: {
        1: images["pets.png"],
        2: images["pool.png"],
        3: images["pool.png"],
        4: images["party.png"],
        5: images["no-smoking.png"],
      },
    },
  ];
  return (
    <div className="unit-details">
      <div className="container mx-auto">
        <div className="text-center heading-color">
          <h1 className="mb-3 text-4xl font-semibold">{unit.name}</h1>
          <p className="text-lg">{unit.location}</p>
        </div>

        <div className="flex flex-col gap-8 p-4 mt-4 bg-white lg:flex-row rounded-xl home-property">
          <div className="w-full lg:w-2/5 ">
            <Swiper
              loop={true}
              modules={[Autoplay, Pagination, Navigation, A11y]}
              //   navigation
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
            >
              {unit.images.map((image, i) => (
                <SwiperSlide key={i}>
                  <div className="h-64 max-h-64">
                    <img
                      src={image}
                      alt={unit.location}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="relative w-full lg:w-3/5">
            <p className="mb-3 text-lg font-bold uppercase heading-color">
              funding now
            </p>
            <div className="relative grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm uppercase menu-color">
                  EST. ANNUAL RETURN
                </p>
                <h3 className="text-base font-semibold heading-color">
                  {unit.annual_yield}%
                </h3>
              </div>
              <div>
                <p className="text-sm uppercase menu-color">No. of investors</p>
                <h3 className="text-base font-semibold heading-color">
                  {numberFormatter(unit.investors)}
                </h3>
              </div>
              <div>
                <p className="text-sm uppercase menu-color">INVESTMENT TYPE</p>
                <h3 className="text-base font-semibold heading-color">
                  Croudfunding
                </h3>
              </div>
              <div>
                <p className="text-sm uppercase menu-color">PROPERTY TYPE</p>
                <h3 className="text-base font-semibold heading-color">
                  Hotel room
                </h3>
              </div>
            </div>

            <div className="relative bottom-0 w-full mt-8 lg:mt-0 pe-4 lg:absolute">
              <Progress
                percent={parseFloat(
                  100 - ((unit.cost - unit.amount) / unit.cost) * 100
                ).toFixed(2)}
              />
              <div className="flex justify-between text-base">
                <p className="menu-color">TARGET</p>
                <div className="flex items-center gap-3">
                  {unit.original_cost !== unit.cost && (
                    <p className="text-red-500 line-through ">
                      ${numberFormatter(unit.original_cost)}
                    </p>
                  )}
                  <p className="font-semibold heading-color">
                    ${numberFormatter(unit.cost)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-16 mt-8">
          <div className="w-2/3">
            <h1 className="pb-3 text-xl font-semibold">Description</h1>
            <p>{unit.description}</p>

            <div className="flex flex-col gap-6 pt-6 mt-4 text-base border-t">
              {_.map(offers, (e, i) => (
                <div key={i}>
                  <h5 className="mb-2 font-medium">{e.title}</h5>
                  <div className="grid grid-cols-3 gap-3">
                    {_.map(e.items, (item, l) => (
                      <div key={l} className="flex items-center gap-2">
                        <img
                          style={{
                            width: "25px",
                            height: "25px",
                            filter: "var(--icon-color)",
                          }}
                          src={e.icons[item.id]}
                          alt="icon"
                        />
                        <p>
                          {item.amenity}
                          {item.rule}
                          {item.safety}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-6 pt-6 mt-4 text-base border-t">
              <p className="main-color">{unit.cleaning_desc}</p>
            </div>
          </div>
          <div className="w-1/3">
            <div className="sticky bg-white rounded-lg home-property top-20">
              <p className="p-4 text-base font-medium text-center border-b main-color">
                Investment
              </p>
              <div className="p-5">
                <p className="text-base head-color">
                  Investment amount (minimum {low_investment})
                </p>

                <div className="flex items-center mt-3 overflow-hidden rounded-lg invest-container">
                  <span className="px-4 py-2.5 invest-input font-medium">
                    $
                  </span>

                  <NumericInput
                    className="px-4 py-2 text-base font-medium bg-transparent outline-none"
                    min={150}
                    step={1}
                    max={unit.cost - unit.amount}
                    value={invest}
                    // eslint-disable-next-line
                    style={false}
                    onBlur={(e) => setInvest(e.target.value)}
                  />
                </div>
                <Slider
                  defaultValue={150}
                  max={unit.cost - unit.amount}
                  min={150}
                  value={invest}
                  onChange={(e) => setInvest(e)}
                  className="mt-6"
                />

                <div className="flex justify-between text-sm">
                  <p>$150</p>
                  <p>${numberFormatter(unit.cost - unit.amount)}</p>
                </div>

                <div className="flex justify-center pt-6 pb-2">
                  <button
                    onClick={() => next(invest)}
                    className="w-full py-3.5 text-sm text-center text-white rounded-full main-bg"
                  >
                    Continue to Signature
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnitSelected;
