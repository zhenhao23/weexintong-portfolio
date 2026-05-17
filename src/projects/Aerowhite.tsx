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
                    <div className="project-info-content aerowhite-content">
                      <h1>aerowhite</h1>
                      <p className="project-description">
                        aerowhite is a visualiser on girlhood in the dance between comfort &amp; conflict.
                      </p>

                      <div className="credits-container two-columns">
                        <div className="credits-column">
                          <div className="credit-item">
                            <span className="credit-role">creative director, producer &amp; editor</span>
                            <span className="credit-name"><a href="https://www.instagram.com/midpovs/" target="_blank" rel="noopener noreferrer">@midpovs</a></span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">soundtrack- apocalyptic calm</span>
                            <span className="credit-name"><a href="https://www.instagram.com/s0fia_cc/" target="_blank" rel="noopener noreferrer">@s0fia_cc</a></span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">cast</span>
                            <span className="credit-name">
                              <a href="https://www.instagram.com/outsspaced/" target="_blank" rel="noopener noreferrer">@outsspaced</a>
                              {" "}
                              <a href="https://www.instagram.com/ruth_ho_/" target="_blank" rel="noopener noreferrer">@ruth_ho_</a>
                            </span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">producer</span>
                            <span className="credit-name"><a href="https://www.instagram.com/mwabelleee/" target="_blank" rel="noopener noreferrer">@mwabelleee</a></span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">co-producer + AD</span>
                            <span className="credit-name"><a href="https://www.instagram.com/nishaadarshan/" target="_blank" rel="noopener noreferrer">@nishaadarshan</a></span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">dop</span>
                            <span className="credit-name"><a href="https://www.instagram.com/ungrayy/" target="_blank" rel="noopener noreferrer">@ungrayy</a></span>
                          </div>
                        </div>
                        <div className="credits-column">
                          <div className="credit-item">
                            <span className="credit-role">gaffer</span>
                            <span className="credit-name"><a href="https://www.instagram.com/supastinga/" target="_blank" rel="noopener noreferrer">@supastinga</a></span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">art director</span>
                            <span className="credit-name"><a href="https://www.instagram.com/joshuatoess/" target="_blank" rel="noopener noreferrer">@joshuatoess</a></span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">hmu &amp; wardrobe stylist</span>
                            <span className="credit-name"><a href="https://www.instagram.com/ruanertang/" target="_blank" rel="noopener noreferrer">@ruanertang</a></span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">dressmaker</span>
                            <span className="credit-name"><a href="https://www.instagram.com/danxsh.s/" target="_blank" rel="noopener noreferrer">@danxsh.s</a></span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">narration</span>
                            <span className="credit-name"><a href="https://www.instagram.com/ruth_ho_/" target="_blank" rel="noopener noreferrer">@ruth_ho_</a></span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">teaser track remixer</span>
                            <span className="credit-name"><a href="https://www.instagram.com/joshuatoess/" target="_blank" rel="noopener noreferrer">@joshuatoess</a></span>
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
