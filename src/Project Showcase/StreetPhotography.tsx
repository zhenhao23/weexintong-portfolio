import React, { useState, useRef, useEffect } from "react";
import "./ProjectShowcase.css";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import Masonry from "react-masonry-css";

// Import street photography images
import street1 from "../assets/portfolio pics/street1.jpg";
import street2 from "../assets/portfolio pics/street2.jpg";
import street3 from "../assets/portfolio pics/street3.jpg";
import street4 from "../assets/portfolio pics/street4.jpg";
import street5 from "../assets/portfolio pics/street5.jpg";
import street6 from "../assets/portfolio pics/street6.jpg";
import street7 from "../assets/portfolio pics/street7.jpg";
import street8 from "../assets/portfolio pics/street8.jpg";
import street9 from "../assets/portfolio pics/street9.jpg";
import street10 from "../assets/portfolio pics/street10.jpg";
import street11 from "../assets/portfolio pics/street11.jpg";
import street12 from "../assets/portfolio pics/street12.jpg";

const StreetPhotography: React.FC = () => {
  const [isContactExpanded, setIsContactExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); // Initialize the navigate function

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  // Create an array with all the street images
  const streetImages = [
    { src: street1, alt: "" },
    { src: street4, alt: "" },
    { src: street2, alt: "" },
    { src: street3, alt: "" },
    { src: street8, alt: "" },
    { src: street5, alt: "" },
    { src: street7, alt: "" },
    { src: street6, alt: "" },

    { src: street11, alt: "" },

    { src: street12, alt: "" },
    { src: street10, alt: "" },
    { src: street9, alt: "" },
  ];

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling when lightbox is open
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto"; // Restore scrolling
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? streetImages.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === streetImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      switch (e.key) {
        case "ArrowLeft":
          goToPrevImage();
          break;
        case "ArrowRight":
          goToNextImage();
          break;
        case "Escape":
          closeLightbox();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  // Handle close button click
  const handleCloseClick = () => {
    navigate("/"); // Navigate back to the cards view
  };
  // Add navigation functions
  const handlePrevious = () => {
    navigate("/project/work-experience"); // The project that comes before this one
  };

  const handleNext = () => {
    navigate("/project/pukul-lima"); // The project that comes after this one
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
                      onClick={() => openLightbox(index)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="card-container">
                        <h3 className="card-title">&nbsp;</h3>
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

      {/* Lightbox component */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div
            className="lightbox-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="lightbox-close" onClick={closeLightbox}>
              ×
            </button>
            <button
              className="lightbox-nav lightbox-prev"
              onClick={goToPrevImage}
            >
              ‹
            </button>
            <div className="lightbox-content">
              <img
                src={streetImages[currentImageIndex].src}
                alt={streetImages[currentImageIndex].alt}
              />
              <p className="lightbox-caption">
                {streetImages[currentImageIndex].alt}
              </p>
            </div>
            <button
              className="lightbox-nav lightbox-next"
              onClick={goToNextImage}
            >
              ›
            </button>
          </div>
        </div>
      )}
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

export default StreetPhotography;
