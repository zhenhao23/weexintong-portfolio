import React from "react";
import "./ProjectShowcase.css";
import "./AboutMe.css";
const profilePic = "https://res.cloudinary.com/dlsyveahz/image/upload/Director_s_Portrait_dazed_off_myq6hr.jpg";
import { useNavigate } from "react-router-dom";
import ContactBubble from "../components/ContactBubble";

const AboutMe: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="project-showcase-container">
      <div className="corner-text top-left" onClick={() => navigate("/project/about-me")}>
        <a>About me</a>
      </div>
      <div className="centered-card-wrapper">
        <div className="centered-card">
          <div className="card-container about-me-card">
            <div className="card-header">
              <div className="header-left">
                <span className="nav-button close-button" onClick={() => navigate("/")}>
                  [close]
                </span>
              </div>
              <div className="header-right">
                <span className="nav-button" onClick={() => navigate("/project/work-experience")}>
                  [previous]
                </span>
                <span className="nav-button" onClick={() => navigate("/project/pukul-lima")}>
                  [next]
                </span>
              </div>
            </div>
            <div className="about-me-content">
              <div className="about-me-image">
                <img src={profilePic} alt="Xin Tong - Profile" />
              </div>
              <div className="about-me-text">
                <h1>About me</h1>
                <p>
                  hello! i'm <span className="highlight">xin tong</span>. i'm an aspiring writer and director born in miri, sarawak and a graduate of lasalle college of the arts where i earned a diploma in broadcast media.
                </p>
                <p>
                  i strive to resist convention in my works by blurring boundaries between shared reality and realms of the inner world. my most authentic form of self-expression is through storytelling crafted with lights and motions.
                </p>
                <p>
                  when i'm not making films, i'm knee-deep in my never ending letterboxd watchlist—chasing stories, moods, and everything in between. you might also catch me experimenting with photography or zoning out on a swing with my headphones on.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContactBubble />
    </div>
  );
};

export default AboutMe;
