import React, { useState } from "react";
import "./ProjectShowcase.css";
import plGif from "../assets/portfolio-gif/FK GIF (1).gif";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ContactBubble from "../components/ContactBubble";

const infoVariants = {
  hidden: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
};

const FindersKeepers: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);
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
                <span className="nav-button info-button" onClick={() => setShowInfo((prev) => !prev)}>
                  [{showInfo ? "hide info" : "info"}]
                </span>
              </div>
              <div className="header-right">
                <span className="nav-button" onClick={() => navigate("/project/fashion-photography")}>
                  [previous]
                </span>
                <span className="nav-button" onClick={() => navigate("/project/about-me")}>
                  [next]
                </span>
              </div>
            </div>
            <div className="content-container">
              <div className={`gif-container ${showInfo ? "blurred" : ""}`}>
                <a href="https://vimeo.com/1076741582" target="_blank" rel="noopener noreferrer">
                  <img src={plGif} alt="Finders Keepers Project" />
                </a>
              </div>

              <AnimatePresence>
                {showInfo && (
                  <motion.div
                    className="project-info-overlay"
                    variants={infoVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <div className="project-info-content">
                      <h1>Finders Keepers</h1>
                      <p className="project-description">
                        Finders Keepers is an innovative tv commercial showcasing a futuristic concept,
                        promoting inclusivity through the street-style clothing line.
                      </p>

                      <div className="credits-container">
                        <div className="credit-item">
                          <span className="credit-role">creative director & editor</span>
                          <span className="credit-name">Xin Tong</span>
                        </div>
                        <div className="credit-item">
                          <span className="credit-role">DOP</span>
                          <span className="credit-name">Casey Phua</span>
                        </div>
                        <div className="credit-item">
                          <span className="credit-role">casts</span>
                          <span className="credit-name">Jyu (Jia Yu), Cate Tan & Suyoung</span>
                        </div>
                        <div className="credit-item">
                          <span className="credit-role">Bts</span>
                          <span className="credit-name">Joshua Toh & Maybelle Myint</span>
                        </div>
                        <div className="credit-item">
                          <span className="credit-role">music</span>
                          <span className="credit-name">Jang Tae Oh</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <ContactBubble />
    </div>
  );
};

export default FindersKeepers;
