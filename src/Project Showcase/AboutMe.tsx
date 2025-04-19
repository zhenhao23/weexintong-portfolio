import React, { useState, useRef, useEffect } from "react";
import "./ProjectShowcase.css";
import "./AboutMe.css"; // We'll create this file for About Me specific styling
import profilePic from "../assets/portfolio pics/profile pic.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AboutMe: React.FC = () => {
  const [isContactExpanded, setIsContactExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Handle close button click
  const handleCloseClick = () => {
    navigate("/"); // Navigate back to the cards view
  };

  // Add navigation functions
  const handlePrevious = () => {
    navigate("/project/finders-keepers");
  };

  const handleNext = () => {
    navigate("/project/dont-wake-me-up");
  };

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
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
      height: isMobile ? "110px" : "94px",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  // Handle mouse events
  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsContactExpanded(true);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (!isMobile) {
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
          <div className="card-container about-me-card">
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
            <div className="about-me-content">
              <div className="about-me-image">
                <img src={profilePic} alt="Xin Tong - Profile" />
              </div>
              <div className="about-me-text">
                <h1>About me</h1>
                <p>
                  Hello! I'm <span className="highlight">xin tong</span>, an
                  aspiring director currently pursuing a Diploma in Broadcast
                  Media at LASALLE College of the Arts. I find my most genuine
                  form of self-expression through storytelling shaped by light
                  and motion.
                </p>
                <p>
                  My approach to filmmaking leans towards experimental and
                  genre-defying, often blending my perception of reality with
                  imagination. At the moment, I'm producing & directing my debut
                  short — <em>Leave as You Are</em>.
                </p>
                <p>
                  When I'm not making films, I'm knee-deep in my never-ending
                  Letterboxd watchlist—chasing stories, moods, and everything in
                  between. You might also catch me experimenting with
                  photography or zoning out on a swing with my headphones on.
                </p>
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
              <a
                href="https://www.linkedin.com/in/weexintong"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AboutMe;
