import React from "react";
import "./ProjectShowcase.css";
import "./AboutMe.css";
import profilePic from "../assets/portfolio pics/profile pic.jpg";
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
                <span className="nav-button" onClick={() => navigate("/project/finders-keepers")}>
                  [previous]
                </span>
                <span className="nav-button" onClick={() => navigate("/project/dont-wake-me-up")}>
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
                  Hello! I'm <span className="highlight">Xin Tong</span>, an aspiring director
                  currently pursuing a Diploma in Broadcast Media at LASALLE College of the Arts.
                  I find my most genuine form of self-expression through storytelling shaped by
                  light and motion.
                </p>
                <p>
                  My approach to filmmaking leans towards experimental and genre-defying, often
                  blending my perception of reality with imagination. At the moment, I'm producing
                  & directing my debut short — <em>Leave as You Are</em>.
                </p>
                <p>
                  When I'm not making films, I'm knee-deep in my never-ending Letterboxd
                  watchlist—chasing stories, moods, and everything in between. You might also
                  catch me experimenting with photography or zoning out on a swing with my
                  headphones on.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContactBubble showLinkedIn />
    </div>
  );
};

export default AboutMe;
