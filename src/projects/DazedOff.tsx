import React, { useState } from "react";
import "./ProjectShowcase.css";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ContactBubble from "../components/ContactBubble";

const videoSrc = "https://res.cloudinary.com/dlsyveahz/video/upload/DAZED_OFF_TRAILER_j69iqv.mp4";

const infoVariants = {
  hidden: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
};

const DazedOff: React.FC = () => {
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
                <span className="nav-button" onClick={() => navigate("/project/aerowhite")}>
                  [previous]
                </span>
                <span className="nav-button" onClick={() => navigate("/project/work-experience")}>
                  [next]
                </span>
              </div>
            </div>
            <div className="content-container">
              <div className={`gif-container ${showInfo ? "blurred" : ""}`}>
                <a href="https://www.instagram.com/dazed__off?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" style={{ display: "block" }}>
                  <video src={videoSrc} autoPlay loop muted playsInline style={{ pointerEvents: "none" }} />
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
                    <div className="project-info-content dazed-off-content">
                      <h1>dazed off (<span className="stkaiti">残忆</span>)</h1>
                      <p className="project-description">
                        dazed off (<span className="stkaiti">残忆</span>) is a narrative drama/thriller short film. It follows Vera (28),
                        a burnt out office worker who escapes an endless white room. She eventually falls
                        through the ceiling, only to see it perfectly intact. Amidst the confusion, she
                        senses a stalker following her. Vera gives chase, only to find herself haunted by
                        places unlocking her past memories.
                        <br /><br />
                        Developed as a final year project and premiered at the 2026 LASALLE Show.
                        Currently on international film festival circuit.
                      </p>

                      <div className="credits-container two-columns">
                        <div className="credits-column">
                          <div className="credit-item">
                            <span className="credit-role">Writer &amp; Director</span>
                            <span className="credit-name">Xin Tong</span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">Producer</span>
                            <span className="credit-name">Manisha Darshan</span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">DOP</span>
                            <span className="credit-name">Angre Nuraini</span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">Gaffer</span>
                            <span className="credit-name">Fatris Azmi</span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">Art Director</span>
                            <span className="credit-name">Kayla Lee</span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">Boom operator</span>
                            <span className="credit-name">Aaron Azrin</span>
                          </div>
                        </div>
                        <div className="credits-column">
                          <div className="credit-item">
                            <span className="credit-role">Editor</span>
                            <span className="credit-name">Xin Tong &amp; Angre Nuraini</span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">Vera</span>
                            <span className="credit-name">Nicole Lee</span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">Leon</span>
                            <span className="credit-name">Wellington Wu</span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">Matt</span>
                            <span className="credit-name">Adrian Toh</span>
                          </div>
                          <div className="credit-item">
                            <span className="credit-role">Stalker</span>
                            <span className="credit-name">Kayla Lee</span>
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

export default DazedOff;
