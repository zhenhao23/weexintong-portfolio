import React, { useState } from "react";
import "./ProjectShowcase.css";
const plGif = "https://res.cloudinary.com/dlsyveahz/video/upload/PL_GIF_fb2qv4.mp4";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "../hooks/useIsMobile";
import ContactBubble from "../components/ContactBubble";

const infoVariants = {
  hidden: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
};

const PukulLima: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);
  const isMobile = useIsMobile();
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
                <span className="nav-button" onClick={() => navigate("/project/about-me")}>
                  [previous]
                </span>
                <span className="nav-button" onClick={() => navigate("/project/dont-wake-me-up")}>
                  [next]
                </span>
              </div>
            </div>
            <div className="content-container">
              <div className={`gif-container ${showInfo ? "blurred" : ""}`}>
                <a href="https://vimeo.com/1114126789" target="_blank" rel="noopener noreferrer">
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
                    <div className={`project-info-content ${isMobile ? "pukul-lima-content" : ""}`}>
                      <h1>Pukul Lima: Falling Into Place</h1>
                      <p className="project-description">
                        Pukul Lima: Falling Into Place follows the journey of Rain Trees in Singapore,
                        exploring the hands that shape them—carpenters, sawmill workers, and
                        artists—uncovering a deep bond between people and the wood that once lived.
                      </p>

                      <div className={`credits-container two-columns ${isMobile ? "pukul-lima-credits" : ""}`}>
                        <div className="credits-column">
                          <div className="credit-item">
                            <span className="credit-role">Director</span>
                            <span className="credit-name">Xin Tong</span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">DOP</span>
                            <span className="credit-name">Luqman Hakim</span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">Producer</span>
                            <span className="credit-name">Maybelle Myint</span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">Cast</span>
                            <span className="credit-name">Ong Meng Hong</span>
                          </div>
                        </div>
                        <div className="credits-column">
                          <div className="credit-item">
                            <span className="credit-role">Editor</span>
                            <span className="credit-name">
                              Shamil Iqmal
                              <br />
                              Xin Tong
                            </span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">Gaffer</span>
                            <span className="credit-name">Aaron Shazrin</span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">Production Designer</span>
                            <span className="credit-name">Perline Peh</span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">Colorist</span>
                            <span className="credit-name">Luqman Hakim</span>
                          </div>
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

export default PukulLima;
