import React from "react";
import "./ProjectShowcase.css";
import { useNavigate } from "react-router-dom";
import Masonry from "react-masonry-css";
import ContactBubble from "../components/ContactBubble";

const BROTHERSINARMS = "https://res.cloudinary.com/dlsyveahz/image/upload/BROTHERS_IN_ARMS_envm7x.jpg";
const BURSTINGPOINT = "https://res.cloudinary.com/dlsyveahz/image/upload/BURSTING_POINT_h4nenc.png";
const OPERATIONBLACKOPS = "https://res.cloudinary.com/dlsyveahz/image/upload/OPERATION_BLACK-OPS_rfklva.png";
const PULAU = "https://res.cloudinary.com/dlsyveahz/image/upload/PULAU_oebsh4.png";

const breakpointColumnsObj = {
  default: 3,
  900: 2,
  600: 1,
};

const workItems = [
  {
    src: BROTHERSINARMS,
    alt: "TOGETHER DAYS (art assist)",
    link: "https://www.isabella-tan.com/brothersinarms",
  },
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
                <span className="nav-button" onClick={() => navigate("/project/dazed-off")}>
                  [previous]
                </span>
                <span className="nav-button" onClick={() => navigate("/project/about-me")}>
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
