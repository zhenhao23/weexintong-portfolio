import React, { useState, useRef, useEffect } from "react";
import "./ProjectShowcase.css";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import Masonry from "react-masonry-css";

// Import street photography images
import BROTHERSINARMS from "../assets/work experience/BROTHERS IN ARMS.jpg";
import BURSTINGPOINT from "../assets/work experience/BURSTING POINT.png";
import OPERATIONBLACKOPS from "../assets/work experience/OPERATION BLACK-OPS.png";
import PULAU from "../assets/work experience/PULAU.png";
const WorkExperience: React.FC = () => {
  const [isContactExpanded, setIsContactExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); // Initialize the navigate function

  const breakpointColumnsObj = {
    default: 3, // Maximum 3 columns
    900: 2, // 2 columns
    600: 1, // 1 column
  };

  // Create an array with all the street images
  const streetImages = [
    {
      src: BURSTINGPOINT,
      alt: "BURSTING POINT (casting assist)",
      link: "https://www.youtube.com/watch?v=QbjsdQfy76o", // Add your actual link here
    },
    {
      src: PULAU,
      alt: "PULAU (casting assist)",
      link: "https://www.youtube.com/watch?v=pQ_mbrY11So", // Add your actual link here
    },
    {
      src: OPERATIONBLACKOPS,
      alt: "OPERATION BLACK-OPS (f&b crew)",
      link: "https://www.youtube.com/watch?v=k1fkCGZntTY", // Add your actual link here
    },
    {
      src: BROTHERSINARMS,
      alt: "TOGETHER DAYS (art assist)",
      link: "https://www.isabella-tan.com/brothersinarms", // Add your actual link here
    },
  ];

  // Handle close button click
  const handleCloseClick = () => {
    navigate("/"); // Navigate back to the cards view
  };
  // Add navigation functions
  const handlePrevious = () => {
    navigate("/project/dont-wake-me-up"); // The project that comes before this one
  };

  const handleNext = () => {
    navigate("/project/street-photography"); // The project that comes after this one
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
              <div className="photo-container">
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  {streetImages.map((image, index) => (
                    <div
                      className="masonry-item"
                      key={index}
                      onClick={() => window.open(image.link, "_blank")} // Open link in new tab
                      style={{ cursor: "pointer" }}
                    >
                      <div className="card-container">
                        <h3 className="card-title">{image.alt}</h3>
                        <img
                          src={image.src}
                          alt={image.alt}
                          loading="lazy"
                          style={{
                            width: "100%",
                            display: "block",
                            marginBottom: "0px",
                          }}
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

export default WorkExperience;
