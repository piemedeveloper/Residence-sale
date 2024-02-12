import React from "react";
import _ from "lodash";

function Numbers() {
  const numbers = [
    {
      figure: "20",
      desc: "Units Funded",
    },
    {
      figure: "$1.1m",
      desc: "Amount Invested",
    },
    {
      figure: "150",
      desc: "Number of Investors",
    },
  ];
  return (
    <div className="gradient-bg">
      <div className="container py-12 mx-auto text-3xl font-medium text-white md:text-4xl">
        <p className="text-center">Numbers at a glance</p>
        <div className="grid max-w-5xl grid-cols-1 mx-auto my-16 gap-y-6 md:grid-cols-3 numbers-cont">
          {_.map(numbers, (number, i) => (
            <div key={i} className="p-2 text-center">
              <p>{number.figure}</p>
              <p className="mt-3 text-lg font-normal">{number.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="max-w-5xl mx-auto text-center">
          Own one or more units in Pieme Residences across Different locations
        </h2>

        <div className="grid gap-6 mt-16 md:grid-cols-2">
          <div>
            <h2 className="text-2xl md:text-3xl">Why Hotel Business?</h2>
            <p className="my-4 text-base font-normal md:text-lg">
              A hotel business is an appealing venture due to its potential for
              consistent revenue, diverse income streams, and the growing demand
              for hospitality services. With global tourism on the rise, hotels
              offer a stable source of income through room bookings,
              conferences, and events. The industry's resilience lies in its
              ability to cater to various customer needs, from luxury
              accommodations to budget-friendly options. Additionally, ancillary
              services such as dining, spa facilities, and entertainment
              contribute to revenue diversification.
            </p>
            <p className="text-base font-normal md:text-lg">
              The recurring nature of travel ensures a steady customer flow,
              providing the hotel business with a solid foundation for growth
              and profitability. Moreover, the sector's adaptability to emerging
              trends, such as technology integration and sustainable practices,
              positions it as a dynamic and lucrative industry for entrepreneurs
              seeking long-term success.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl">
              Why Community Hotel Ownership Model?
            </h2>
            <p className="my-4 text-base font-normal md:text-lg">
              The community hotel ownership model, exemplified by Pieme
              Residences, offers a groundbreaking approach by breaking down
              financial barriers, allowing individuals to invest modest sums, as
              low as $1000. This democratization not only broadens investor
              participation but also mitigates financial risks by dispersing
              ownership across diverse contributors. The inclusive model,
              supported by a professional team, streamlines day-to-day
              operations, relieving investors of managerial responsibilities and
              ensuring a seamless guest experience.
            </p>

            <p className="text-base font-normal md:text-lg">
              Beyond financial inclusivity and risk diversification, this
              approach aligns with evolving consumer preferences for socially
              responsible businesses, contributing to the hotel's long-term
              appeal and sustainability. In essence, community hotel ownership
              establishes a robust foundation for success by combining financial
              accessibility, risk mitigation, efficient management, and
              alignment with contemporary values.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Numbers;
