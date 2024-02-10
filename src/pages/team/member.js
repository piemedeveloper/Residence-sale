import React from "react";
import { Slide } from "react-awesome-reveal";

function TeamMember({ member }) {
  return (
    <Slide direction="right" triggerOnce>
      <div className="bg-white rounded-xl overflow-hidden home-property ">
        <div>
          <img src={member.photo} alt={member.name} />
        </div>
        <div className="p-5">
          <h2 className="main-color font-semibold">
            {member.name}, {member.title}
          </h2>
          <p className="text-sm mt-2 menu-color">{member.desc}</p>
        </div>
      </div>
    </Slide>
  );
}

export default TeamMember;
