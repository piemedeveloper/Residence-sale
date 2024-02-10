import React from "react";
import why_invest from "../../assets/why-invest.png";
import { low_investment } from "../../utils/data";
import Slider from "../about/slider";
import { Link } from "react-router-dom";

function WhyInvest() {
  const testimonials = [
    {
      photo:
        "https://media.licdn.com/dms/image/C4D03AQGuaqBw0c_Pqg/profile-displayphoto-shrink_800_800/0/1633341653846?e=2147483647&v=beta&t=kBE7vPrX-O5cW8h9b0_hZ3N9BbQsC6XuFfCQx7aWtEs",
      message:
        "Pieme takes care of everything tedious about real estate investment: formalities, insurance, maintenance, tenants, etc. The variety of properties allows diversification which gives me greater peace of mind. The process is really simple - you can keep track of your investments anytime, anywhere.",
      name: "Carlos Paz y Mino - Architect, Ecuador",
    },

    {
      photo:
        "https://pbs.twimg.com/profile_images/1441776451187924997/b78zR_5X_400x400.jpg",
      message:
        "I’ve been impressed with Pieme from the very beginning. The investing process was made clear and simple through the website and there is always excellent support available. I strongly recommend them.",
      name: "Carlos Paz y Mino - Architect, Ecuador",
    },
  ];

  return (
    <div className="gradient-bg py-16">
      <div
        className="bg-no-repeat bg-center pb-2"
        style={{
          backgroundImage: `url(${why_invest})`,
        }}
      >
        <div className="max-w-2xl mx-auto text-white text-center mb-6">
          <h2 className="text-4xl font-semibold">Why invest with Pieme?</h2>
          <p className="text-lg mt-3">
            Pieme is a state-of-the-art crowdfunding platform providing direct
            access to secure, asset-backed investment opportunities hand-picked
            from around the world. Create an internationally diversified real
            estate portfolio from as little as {low_investment}, from the palm
            of your hand.
          </p>
        </div>

        <Slider />

        <div className="flex justify-center mb-10 mt-6">
          <Link>
            <p className="mt-20 text-center register-btn">Register</p>
          </Link>
        </div>
      </div>

      <div className="container mx-auto relative grid gap-8 lg:grid-cols-2">
        {testimonials.map((t, i) => (
          <div key={i} className="flex gap-4 p-6 bg-white rounded-xl">
            <img
              src={t.photo}
              alt="investing"
              className="w-16 h-16 rounded-full min-w-16"
            />
            <div>
              <p className="text-base">"{t.message}"</p>
              <p className="mt-2 text-base">{t.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhyInvest;
