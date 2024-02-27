import React from "react";
import Slider from "./slider";
import { Markup } from "interweave";
import { Helmet } from "react-helmet";

function About() {
  const about = [
    "Welcome to Pieme Residences, where hotel investment meets simplicity and accessibility. Our platform is tailored specifically for Pieme Residences, offering investors seamless access to the hotel business and easy management of their investments.",
    "At Pieme, investors can easily monitor the performance of their units, track bookings, and claim their revenue share with just a few clicks. Whether you're interested in owning an entire unit or investing in fractions, our platform makes it hassle-free to join the hotel business community.",
    "Pieme Residences are more than just hotels - they're community-owned hotel apartments powered by Blockchain technology. Join us and experience the convenience of owning a fraction of hotel properties in various locations around the world. Welcome to Pieme Residences, where hotel investment is made simple for everyone.",
    "<b>Here are some advantages of investing with Pieme: </b>",
    "<b>Fractional Ownership</b> Own a fraction of hotel properties in diverse locations, reducing risk and increasing investment opportunities.<br />Blockchain-Powered: Benefit from the transparency and security of Blockchain technology, ensuring trust and integrity in your investments.",
    "<b>Global Access: </b>Invest from anywhere in the world and manage your portfolio conveniently through our user-friendly platform.",
    "<b>Attractive Returns: </b>Enjoy potential returns from secure asset-backed investments in the booming hotel industry.",
    "<b>Community-Oriented: </b>Become part of a community-owned network of hotel apartments, fostering collaboration and shared success.",
  ];

  const page = {
    title: "About Pieme",
    image:
      "https://pieme.info/static/media/residence1.c6793ed9481d810021e0.jpeg",
    description:
      "Welcome to Pieme Residences, where hotel investment meets simplicity and accessibility. Our platform is tailored specifically for Pieme Residences, offering investors seamless access to the hotel business and easy management of their investments.",
  };

  return (
    <div>
      <Helmet>
        <title>{page.title}</title>
        <meta name="title" content={page.title} />
        <meta name="description" content={page.description} />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.description} />

        <meta
          property="og:image"
          content={page.image}
          data-react-helmet="true"
        />

        <meta name="twitter:title" content={page.title} />
        <meta name="twitter:description" content={page.description} />
        <meta
          name="twitter:image"
          content={page.image}
          data-react-helmet="true"
        />
        <meta
          name="twitter:card"
          content={page.image}
          data-react-helmet="true"
        />
      </Helmet>

      <div className="max-w-3xl px-2 py-12 mx-auto text-center heading-color">
        <h1 className="text-5xl font-semibold">About Pieme</h1>
      </div>

      <div className="px-2 py-12 gradient-bg">
        <Slider />
      </div>

      <div className="container py-10 mx-auto">
        {about.map((d, i) => (
          <p key={i} className="mt-6 text-lg menu-color">
            <Markup content={d} />
          </p>
        ))}
      </div>
    </div>
  );
}

export default About;
