import React, { useState, useRef, useEffect } from "react";
import "./ProjectShowcase.css";
import plGif from "../assets/postfolio gif/PL GIF.gif"; // Import the GIF file
// import plGifMobile from "../assets/postfolio gif/PL GIF (1).gif"; // Import the smaller GIF file
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const PukulLima: React.FC = () => {
  const [isContactExpanded, setIsContactExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); // Initialize the navigate function

  // Handle close button click
  const handleCloseClick = () => {
    navigate("/"); // Navigate back to the cards view
  };

  // Toggle project info display
  const handleInfoClick = () => {
    setShowInfo((prev) => !prev);
  };

  // Add navigation functions
  const handlePrevious = () => {
    navigate("/project/street-photography"); // The project that comes before this one
  };

  const handleNext = () => {
    navigate("/project/urban-photography"); // The project that comes after this one
  };

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Common breakpoint for mobile
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Animation variants
  const bubbleVariants = {
    collapsed: {
      height: isMobile ? "50px" : "25px",
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
    expanded: {
      height: isMobile ? "110px" : "94px", // Adjust these values based on your content
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  // Animation variants for info overlay
  const infoVariants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  // Handle mouse events with a delay to prevent flickering (for desktop)
  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsContactExpanded(true);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    // Only apply hover behavior on desktop
    if (!isMobile) {
      // Check if the mouse is truly leaving the entire bubble
      if (
        bubbleRef.current &&
        !bubbleRef.current.contains(e.relatedTarget as Node)
      ) {
        setIsContactExpanded(false);
      }
    }
  };

  // Handle click for mobile devices
  const handleBubbleClick = () => {
    if (isMobile) {
      setIsContactExpanded((prev) => !prev);
    }
  };

  return (
    <div className="project-showcase-container">
      {/* Corner text elements */}
      <div
        className="corner-text top-left"
        onClick={() => navigate("/project/about-me")}
      >
        <a>About me</a>
      </div>
      {/* <div className="corner-text bottom-left">Midpovs</div> */}
      <div className="centered-card-wrapper">
        <div className="centered-card">
          <div className="card-container">
            <div className="card-header">
              <div className="header-left">
                <span
                  className="nav-button close-button"
                  onClick={handleCloseClick}
                >
                  [close]
                </span>
                <span
                  className="nav-button info-button"
                  onClick={handleInfoClick}
                >
                  [{showInfo ? "hide info" : "info"}]
                </span>
              </div>
              <div className="header-right">
                <span className="nav-button" onClick={handlePrevious}>
                  [previous]
                </span>
                <span className="nav-button" onClick={handleNext}>
                  [next]
                </span>
              </div>
            </div>
            <div className="content-container">
              <div className={`gif-container ${showInfo ? "blurred" : ""}`}>
                <img src={isMobile ? plGif : plGif} alt="Pukul Lima Project" />
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
                    <div
                      className={`project-info-content ${
                        isMobile ? "pukul-lima-content" : ""
                      }`}
                    >
                      <h1>Pukul Lima: Falling Into Place</h1>
                      <p className="project-description">
                        Pukul Lima: Falling Into Place follows the journey of
                        Rain Trees in Singapore, exploring the hands that shape
                        them—carpenters, sawmill workers, and artists—uncovering
                        a deep bond between people and the wood that once lived.
                        The documentary is currently in submission to festivals,
                        with hopes of sharing its story with the public soon.
                      </p>

                      <div
                        className={`credits-container two-columns ${
                          isMobile ? "pukul-lima-credits" : ""
                        }`}
                      >
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
                            <span className="credit-role">
                              Production Designer
                            </span>
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
      <motion.div
        ref={bubbleRef}
        className={`contact-bubble ${isContactExpanded ? "expanded" : ""}`}
        variants={bubbleVariants}
        initial="collapsed"
        animate={isContactExpanded ? "expanded" : "collapsed"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleBubbleClick}
      >
        <h3 className="contact-title">Let's talk</h3>
        <AnimatePresence>
          <motion.div
            className="contact-content"
            // variants={contentVariants}
            initial="collapsed"
            animate={isContactExpanded ? "expanded" : "collapsed"}
          >
            <a href="mailto:wxintong.work@gmail.com" className="contact-email">
              wxintong.work@gmail.com
            </a>
            <div className="social-links">
              <a
                href="https://www.instagram.com/midpovs"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default PukulLima;
