import React from "react";
import "./ProjectShowcase.css";
import { useNavigate } from "react-router-dom";
import Masonry from "react-masonry-css";
import ContactBubble from "../components/ContactBubble";

import BROTHERSINARMS from "../assets/work experience/BROTHERS IN ARMS.jpg";
import BURSTINGPOINT from "../assets/work experience/BURSTING POINT.png";
import OPERATIONBLACKOPS from "../assets/work experience/OPERATION BLACK-OPS.png";
import PULAU from "../assets/work experience/PULAU.png";

const breakpointColumnsObj = {
  default: 3,
  900: 2,
  600: 1,
};

const workItems = [
  {
    src: BURSTINGPOINT,
    alt: "BURSTING POINT (casting assist)",
    link: "https://www.youtube.com/watch?v=QbjsdQfy76o",
  },
  {
    src: PULAU,
    alt: "PULAU (casting assist)",
    link: "https://www.youtube.com/watch?v=pQ_mbrY11So",
  },
  {
    src: OPERATIONBLACKOPS,
    alt: "OPERATION BLACK-OPS (f&b crew)",
    link: "https://www.youtube.com/watch?v=k1fkCGZntTY",
  },
  {
    src: BROTHERSINARMS,
    alt: "TOGETHER DAYS (art assist)",
    link: "https://www.isabella-tan.com/brothersinarms",
  },
];

const WorkExperience: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="project-showcase-container">
      <div className="corner-text top-left" onClick={() => navigate("/project/about-me")}>
        <a>About me</a>
      </div>
      <div className="centered-card-wrapper">
        <div className="centered-card">
          <div className="card-container">
            <div className="card-header">
              <div className="header-left">
                <span className="nav-button close-button" onClick={() => navigate("/")}>
                  [close]
                </span>
              </div>
              <div className="header-right">
                <span className="nav-button" onClick={() => navigate("/project/dont-wake-me-up")}>
                  [previous]
                </span>
                <span className="nav-button" onClick={() => navigate("/project/street-photography")}>
                  [next]
                </span>
              </div>
            </div>
            <div className="content-container">
              <div className="photo-container">
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  {workItems.map((item, index) => (
                    <div
                      className="masonry-item"
                      key={index}
                      onClick={() => window.open(item.link, "_blank")}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="card-container">
                        <h3 className="card-title">{item.alt}</h3>
                        <img
                          src={item.src}
                          alt={item.alt}
                          loading="lazy"
                          style={{ width: "100%", display: "block", marginBottom: "0px" }}
                        />
                      </div>
                    </div>
                  ))}
                </Masonry>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContactBubble />
    </div>
  );
};

export default WorkExperience;
