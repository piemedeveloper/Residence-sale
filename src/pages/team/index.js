import React from "react";
import TeamMember from "./member";
import { Link } from "react-router-dom";

function Team() {
  const members = [
    {
      photo:
        "https://pbs.twimg.com/profile_images/1441776451187924997/b78zR_5X_400x400.jpg",
      name: "Kainja Joshua",
      title: "CEO & Co founder",
      desc: "dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap",
    },

    {
      photo:
        "https://pbs.twimg.com/profile_images/1441776451187924997/b78zR_5X_400x400.jpg",
      name: "Kainja Joshua",
      title: "CEO & Co founder",
      desc: "dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap",
    },
    {
      photo:
        "https://pbs.twimg.com/profile_images/1441776451187924997/b78zR_5X_400x400.jpg",
      name: "Kainja Joshua",
      title: "CEO & Co founder",
      desc: "dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap",
    },
    {
      photo:
        "https://pbs.twimg.com/profile_images/1441776451187924997/b78zR_5X_400x400.jpg",
      name: "Kainja Joshua",
      title: "CEO & Co founder",
      desc: "dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer",
    },
    {
      photo:
        "https://pbs.twimg.com/profile_images/1441776451187924997/b78zR_5X_400x400.jpg",
      name: "Kainja Joshua",
      title: "CEO & Co founder",
      desc: "dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap",
    },
    {
      photo:
        "https://pbs.twimg.com/profile_images/1441776451187924997/b78zR_5X_400x400.jpg",
      name: "Kainja Joshua",
      title: "CEO & Co founder",
      desc: "dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap",
    },

    {
      photo:
        "https://pbs.twimg.com/profile_images/1441776451187924997/b78zR_5X_400x400.jpg",
      name: "Kainja Joshua",
      title: "CEO & Co founder",
      desc: "dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap",
    },
    {
      photo:
        "https://pbs.twimg.com/profile_images/1441776451187924997/b78zR_5X_400x400.jpg",
      name: "Kainja Joshua",
      title: "CEO & Co founder",
      desc: "dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap",
    },
    {
      photo:
        "https://pbs.twimg.com/profile_images/1441776451187924997/b78zR_5X_400x400.jpg",
      name: "Kainja Joshua",
      title: "CEO & Co founder",
      desc: "dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap",
    },
    {
      photo:
        "https://pbs.twimg.com/profile_images/1441776451187924997/b78zR_5X_400x400.jpg",
      name: "Kainja Joshua",
      title: "CEO & Co founder",
      desc: "dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap",
    },
  ];
  return (
    <div className="gray-bg">
      <div className="container mx-auto pb-16">
        <div className="max-w-3xl text-center mx-auto px-2 py-12 heading-color">
          <h1 className="text-5xl font-semibold">The Team</h1>
          <p className="text-lg mt-4">
            When you invest with Pieme you benefit from world class team of
            experts, institutional due diligence processes and over $2bn of real
            estate investment experience.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 md:grid-cols-3 gap-6 content-center">
          {members.map((member, i) => (
            <TeamMember key={i} member={member} />
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Link>
            <p className="mt-20 text-center register-btn home-property">
              Contact Us
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Team;
