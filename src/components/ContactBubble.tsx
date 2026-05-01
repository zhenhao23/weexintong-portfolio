import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "../hooks/useIsMobile";
import { EMAIL, INSTAGRAM_URL, LINKEDIN_URL } from "../constants";

interface ContactBubbleProps {
  showLinkedIn?: boolean;
}

const ContactBubble: React.FC<ContactBubbleProps> = ({ showLinkedIn = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  const bubbleRef = useRef<HTMLDivElement>(null);

  const bubbleVariants = {
    collapsed: {
      height: isMobile ? "50px" : "25px",
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    expanded: {
      height: isMobile ? "110px" : "94px",
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  const handleMouseEnter = () => {
    if (!isMobile) setIsExpanded(true);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (!isMobile && bubbleRef.current && !bubbleRef.current.contains(e.relatedTarget as Node)) {
      setIsExpanded(false);
    }
  };

  const handleClick = () => {
    if (isMobile) setIsExpanded((prev) => !prev);
  };

  return (
    <motion.div
      ref={bubbleRef}
      className={`contact-bubble ${isExpanded ? "expanded" : ""}`}
      variants={bubbleVariants}
      initial="collapsed"
      animate={isExpanded ? "expanded" : "collapsed"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <h3 className="contact-title">Let's talk</h3>
      <AnimatePresence>
        <motion.div
          className="contact-content"
          initial="collapsed"
          animate={isExpanded ? "expanded" : "collapsed"}
        >
          <a href={`mailto:${EMAIL}`} className="contact-email">
            {EMAIL}
          </a>
          <div className="social-links">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            {showLinkedIn && (
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default ContactBubble;
