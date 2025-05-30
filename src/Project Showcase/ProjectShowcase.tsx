import React, { useState, useRef, useEffect } from "react";
import "./ProjectShowcase.css";
import plGif from "./assets/postfolio gif/PL GIF.gif"; // Import the GIF file
import { motion, AnimatePresence } from "framer-motion";

const ProjectShowcase: React.FC = () => {
  const [isContactExpanded, setIsContactExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);

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
      height: isMobile ? "40px" : "25px",
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
      <div className="corner-text top-left">Midpovs</div>
      <div className="corner-text top-right">Filmmaker</div>
      <div className="corner-text bottom-right">Director</div>
      <div className="corner-text bottom-left">Videographer</div>
      <div className="centered-card-wrapper">
        <div className="centered-card">
          <div className="card-container">
            <div className="card-header">
              <div className="header-left">
                <span className="nav-button close-button">[close]</span>
              </div>
              <div className="header-right">
                <span className="nav-button">[previous]</span>
                <span className="nav-button">[next]</span>
              </div>
            </div>
            <div className="content-container">
              <div className="gif-container">
                <img src={plGif} alt="Pukul Lima Project" />
              </div>
              <div className="nav-scroll-container">
                <div className="project-nav">
                  <span className="project-nav-item">PROJECT</span>
                  <span className="project-nav-item">INTRODUCTION</span>
                  <span className="project-nav-item">CREDITS</span>
                  <span className="project-nav-item">CREDITS</span>
                  <span className="project-nav-item">CREDITS</span>
                </div>
              </div>
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
            <p className="contact-email">wxintong.work@gmail.com</p>
            <div className="social-links">
              <a
                href="https://instagram.com/username"
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

export default ProjectShowcase;
