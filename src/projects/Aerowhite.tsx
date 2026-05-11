import React, { useState } from "react";
import "./ProjectShowcase.css";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ContactBubble from "../components/ContactBubble";

const videoSrc = "https://res.cloudinary.com/dlsyveahz/video/upload/aerowhite_teaser_final_bokp8d.mp4";

const infoVariants = {
  hidden: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
};

const Aerowhite: React.FC = () => {
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
                <span className="nav-button" onClick={() => navigate("/project/finders-keepers")}>
                  [previous]
                </span>
                <span className="nav-button" onClick={() => navigate("/project/dazed-off")}>
                  [next]
                </span>
              </div>
            </div>
            <div className="content-container">
              <div className={`gif-container ${showInfo ? "blurred" : ""}`}>
                <a href="https://vimeo.com/1187592623?fl=pl&fe=sh" target="_blank" rel="noopener noreferrer">
                  <video src={videoSrc} autoPlay loop muted playsInline />
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
                      <h1>Aerowhite</h1>
                      <p className="project-description">
                        aerowhite is a visualiser on girlhood in the dance between comfort &amp; conflict.
                      </p>

                      <div className="credits-container two-columns">
                        <div className="credits-column">
                          <div className="credit-item">
                            <span className="credit-role">Creative director, producer &amp; editor</span>
                            <span className="credit-name">Xin Tong</span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">Soundtrack</span>
                            <span className="credit-name">apocalyptic calm — Sofia CC</span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">Cast</span>
                            <span className="credit-name">@outsspaced &amp; Ruth Ho</span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">Producer</span>
                            <span className="credit-name">@mwabelleee</span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">Co-producer &amp; AD</span>
                            <span className="credit-name">Nisha Adarshan</span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">DOP</span>
                            <span className="credit-name">@ungrayy</span>
                          </div>
                        </div>
                        <div className="credits-column">
                          <div className="credit-item">
                            <span className="credit-role">Gaffer</span>
                            <span className="credit-name">@supastinga</span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">Art director</span>
                            <span className="credit-name">Joshua Toh</span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">HMU &amp; Wardrobe stylist</span>
                            <span className="credit-name">@ruanertang</span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">Dressmaker</span>
                            <span className="credit-name">@danxsh.s</span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">Narration</span>
                            <span className="credit-name">Ruth Ho</span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">Teaser track remixer</span>
                            <span className="credit-name">Joshua Toh</span>
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

export default Aerowhite;
