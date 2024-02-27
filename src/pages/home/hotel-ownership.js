import React from "react";
import hotel from "../../assets/images/hotel-ownership.jpeg";

function HotelOwnership() {
  return (
    <div className="grid md:gap-10 md:grid-cols-2 gray-bg">
      <div>
        <img src={hotel} alt="" className="object-cover w-full h-full" />
      </div>
      <div className="flex items-center ">
        <div className="max-w-3xl px-6 py-10 text-lg md:py-14 md:pe-10 menu-color">
          <h2 className="text-3xl font-semibold heading-color">
            Unlocking Hotel Ownership: Pieme Residences Opportunity
          </h2>
          <h4 className="my-3 font-medium main-color">
            Your Path to Becoming a Hotelier
          </h4>

          <p className="my-3">
            Embark on Your Hotel Ownership Adventure with Pieme Residences!
          </p>
          <p>
            Dive into the world of hotel ownership with Pieme Residences! Our
            unique platform empowers investors to begin their journey with as
            little as $150, acquiring fractional ownership of hotel rooms. For
            those seeking a larger stake, seize the opportunity to claim an
            entire unit valued at up to $55,000 or more for other residences.
            Whether you're a seasoned investor or a newcomer, Pieme offers a
            gateway to hotel ownership that's accessible and rewarding. Join our
            vibrant community and unlock the benefits of hotel ownership, from
            passive income streams to exclusive privileges. Start your journey
            today with Pieme Residences and discover the thrill of owning a
            slice of the hospitality industry!
          </p>
        </div>
      </div>
    </div>
  );
}

export default HotelOwnership;
