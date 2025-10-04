import React from "react";
import { Link } from "react-router-dom";
import { arrow } from "../assets/icons";

const stageContent = {
  1: {
    type: "heading",
    content: (
      <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
        Hi, I'm
        <span className="font-semibold mx-2 text-white">Kelechi</span> 👋
        <br />
        A Software Engineer and 3D Enthusiast
      </h1>
    ),
  },
  2: {
    text: "Brought fresh solutions to real business problems <br /> while rapidly developing in-demand skills",
    link: { to: "/about", label: "Learn more" },
  },
  3: {
    text: "Turned challenges into successful outcomes. <br /> Discover my journey?",
    link: { to: "/projects", label: "Visit my portfolio" },
  },
  4: {
    text: "Need a project done or looking for a dev? <br/> I'm just a few keystrokes away",
    link: { to: "/contact", label: "Let's talk" },
  },
};

const HomeInfo = ({ currentStage }) => {
  const stage = stageContent[currentStage];

  if (!stage) return null;

  if (stage.type === "heading") {
    return stage.content;
  }

  return (
    <div className="info-box">
      <p
        className="font-medium sm:text-xl text-center"
        dangerouslySetInnerHTML={{ __html: stage.text }}
      />
      <Link
        to={stage.link.to}
        className="neo-brutalism-white neo-btn"
        aria-label={stage.link.label}
      >
        {stage.link.label}
        <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
      </Link>
    </div>
  );
};

export default HomeInfo;
