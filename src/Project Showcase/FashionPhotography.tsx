import React, { useState, useRef, useEffect } from "react";
import "./ProjectShowcase.css";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import Masonry from "react-masonry-css";

// Import street photography images
import fashion1 from "../assets/portfolio pics/fashion1.jpg";
import fashion2 from "../assets/portfolio pics/fashion2.jpg";
import fashion3 from "../assets/portfolio pics/fashion3.jpg";
import fashion4 from "../assets/portfolio pics/fashion4.jpg";
const FashionPhotography: React.FC = () => {
  const [isContactExpanded, setIsContactExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); // Initialize the navigate function

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const breakpointColumnsObj = {
    default: 3, // Maximum 3 columns
    900: 2, // 2 columns
    600: 1, // 1 column
  };

  // Create an array with all the street images
  const streetImages = [
    { src: fashion3, alt: "Fashion photography 3" },
    { src: fashion1, alt: "Fashion photography 1" },
    { src: fashion4, alt: "Fashion photography 4" },
    { src: fashion2, alt: "Fashion photography 2" },
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
    navigate("/project/urban-photography"); // The project that comes before this one
  };

  const handleNext = () => {
    navigate("/project/finders-keepers"); // The project that comes after this one
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
      <div className="corner-text bottom-left">Midpovs</div>
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

export default FashionPhotography;
