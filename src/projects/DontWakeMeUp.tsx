import React, { useState } from "react";
import "./ProjectShowcase.css";
const plGif = "https://res.cloudinary.com/dlsyveahz/video/upload/DWMU_GIF_lmltpz.mp4";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ContactBubble from "../components/ContactBubble";

const infoVariants = {
  hidden: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
};

const DontWakeMeUp: React.FC = () => {
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
                <span className="nav-button" onClick={() => navigate("/project/pukul-lima")}>
                  [previous]
                </span>
                <span className="nav-button" onClick={() => navigate("/project/finders-keepers")}>
                  [next]
                </span>
              </div>
            </div>
            <div className="content-container">
              <div className={`gif-container ${showInfo ? "blurred" : ""}`}>
                <a href="https://vimeo.com/1076739686" target="_blank" rel="noopener noreferrer">
                  <video src={plGif} autoPlay loop muted playsInline />
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
                      <h1>Don't Wake Me Up</h1>
                      <p className="project-description">
                        In a deep struggle against fading memories, a girl is haunted by the absence of
                        a beloved friend, fearing that ceasing to remember will erase her friend from
                        existence.
                      </p>

                      <div className="credits-container">
                        <div className="credit-item">
                          <span className="credit-role">Director, writer & editor</span>
                          <span className="credit-name">Xin Tong</span>
                        </div>
                        <div className="credit-item">
                          <span className="credit-role">DOP</span>
                          <span className="credit-name">Casey Phua & Xin Tong</span>
                        </div>
                        <div className="credit-item">
                          <span className="credit-role">Casts</span>
                          <span className="credit-name">Ademi Kambarbekova & Xin Tong</span>
                        </div>
                        <div className="credit-item">
                          <span className="credit-role">Production assistant</span>
                          <span className="credit-name">Joshua Toh & Tiffany Tan</span>
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

export default DontWakeMeUp;
