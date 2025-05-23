import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollTriggerCircularCards.css";
// import LazyImage from "./LazyImage"; // Import the LazyImage component
import { motion, AnimatePresence } from "framer-motion";

// Import your portfolio images
// You can replace the placeholders with actual imports later
import photo1 from "./assets/portfolio pics/street1.jpg";
import photo2 from "./assets/work experience/BURSTING POINT.png";
import photo3 from "./assets/urban photography/urban3.jpg";
import photo4 from "./assets/portfolio pics/fashion3.jpg";
import profile from "./assets/portfolio pics/profile pic.jpg";
import gif1 from "./assets/postfolio gif/DWMU GIF (1).gif";
import gif2 from "./assets/postfolio gif/FK GIF (1).gif";
import gif3 from "./assets/postfolio gif/PL GIF (1).gif";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Add this line to detect Safari browser
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

// Define props type for the component
interface ScrollTriggerCircularCardsProps {
  onCardClick?: (projectPath: string) => void;
}

const ScrollTriggerCircularCards = ({
  onCardClick,
}: ScrollTriggerCircularCardsProps) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const rotationAngleRef = useRef(0);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const velocityRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const isClickingRef = useRef<boolean>(false);
  const clickStartTimeRef = useRef<number>(0);
  const [isContactExpanded, setIsContactExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);
  // Track touch for distinguishing between scrolling and tapping
  const touchStartXRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);
  const touchTimeStartRef = useRef<number>(0);

  // Create an array with all portfolio images, duplicated to get 18 items
  const portfolioImages = [
    gif3,
    photo1,
    photo2,
    gif1,
    profile,
    gif2,
    photo4,
    photo3,

    gif3,
    photo1,
    photo2,
    gif1,
    profile,
    gif2,
    photo4,
    photo3,
  ];

  // Add an array of project titles and corresponding paths
  const projects = [
    { title: "Pukul Lima", path: "pukul-lima" },
    { title: "Film Photography", path: "street-photography" },
    { title: "Work Experience", path: "work-experience" },
    { title: "Don't Wake Me Up", path: "dont-wake-me-up" },
    { title: "About Me", path: "about-me" },
    { title: "Finders Keepers", path: "finders-keepers" },
    { title: "Editorial Photography", path: "fashion-photography" },
    { title: "Film Photography", path: "urban-photography" },
  ];

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

  // Handle touch events for cards
  // const handleCardTouchStart = (e: React.TouchEvent, projectPath: string) => {
  const handleCardTouchStart = (e: React.TouchEvent) => {
    // Don't stop propagation - let the event bubble up for wheel scrolling
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    touchTimeStartRef.current = performance.now();
    isClickingRef.current = true;
    clickStartTimeRef.current = performance.now();
  };

  const handleCardTouchEnd = (e: React.TouchEvent, projectPath: string) => {
    // Calculate if this was a tap or a scroll
    const touchEndTime = performance.now();
    const touchDuration = touchEndTime - touchTimeStartRef.current;

    // Get the last touch position
    let touchEndX = touchStartXRef.current;
    let touchEndY = touchStartYRef.current;

    if (e.changedTouches && e.changedTouches.length > 0) {
      touchEndX = e.changedTouches[0].clientX;
      touchEndY = e.changedTouches[0].clientY;
    }

    // Calculate distance moved
    const distX = Math.abs(touchEndX - touchStartXRef.current);
    const distY = Math.abs(touchEndY - touchStartYRef.current);

    // If touch was short and didn't move much, consider it a tap
    if (touchDuration < 300 && distX < 10 && distY < 10) {
      // Only prevent default when we're sure it's a tap, not a scroll attempt
      e.preventDefault();
      if (onCardClick) {
        onCardClick(projectPath);
      }
    }

    isClickingRef.current = false;
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

  const handleBubbleClick = (e: React.MouseEvent) => {
    // Don't intercept clicks on links or their children
    if ((e.target as HTMLElement).closest("a")) {
      return; // Allow the link click to proceed normally
    }

    // Make sure the event doesn't propagate for non-link clicks
    e.preventDefault();
    e.stopPropagation();

    // console.log(
    //   "Bubble clicked, mobile:",
    //   isMobile,
    //   "current state:",
    //   isContactExpanded
    // );

    // Force the toggle regardless of mobile status
    setIsContactExpanded((prev) => !prev);
  };

  const handleBubbleTouchEnd = (e: React.TouchEvent) => {
    // Get the actual target element that was touched
    const target = e.target as HTMLElement;

    // Check if the touch is on a link or any of its children
    const linkElement = target.closest("a");
    if (linkElement) {
      // For link elements, allow the default behavior (navigate to href)
      // We don't need to do anything here - just let the event propagate
      return;
    }

    // For non-link elements, prevent default and toggle the bubble
    e.preventDefault();
    e.stopPropagation();
    setIsContactExpanded((prev) => !prev);
  };

  // Handler for card click
  const handleCardClick = (projectPath: string) => {
    // Only navigate if this was a genuine click (not just ending a scroll)
    if (
      isClickingRef.current &&
      performance.now() - clickStartTimeRef.current < 300
    ) {
      if (onCardClick) {
        onCardClick(projectPath);
      }
    }
    isClickingRef.current = false;
  };

  useEffect(() => {
    // Get all card elements
    const wheel = wheelRef.current;
    const cards = gsap.utils.toArray<HTMLElement>(".wheel__card");
    const totalCards = cards.length;

    // Function to update card positions based on current rotation angle
    const updateCardPositions = (currentAngle = 0) => {
      if (!wheel) return;

      const center = wheel.offsetWidth / 2;

      // Get the current viewport width
      const viewportWidth = window.innerWidth;

      // Define different radius ratios based on screen size
      let horizontalRatio = 2; // Default (desktop): offsetWidth / 2
      let verticalRatio = 4.5; // Default (desktop): offsetWidth / 4.5

      // Adjust ratios for tablet
      if (viewportWidth <= 1024 && viewportWidth > 767) {
        horizontalRatio = 2.3; // Make ellipse wider on tablets
        verticalRatio = 3; // Make ellipse slightly flatter
      }

      // Adjust ratios for mobile
      if (viewportWidth <= 767) {
        horizontalRatio = 2.4; // Make ellipse wider on mobile
        verticalRatio = 3; // Make ellipse flatter on mobile
      }

      // Calculate the actual radius values
      const radiusX = wheel.offsetWidth / horizontalRatio;
      const radiusY = wheel.offsetWidth / verticalRatio;

      const slice = (2 * Math.PI) / totalCards;

      cards.forEach((card, i) => {
        // Calculate position on oval path based on card index and current rotation
        const angle = i * slice + currentAngle;

        // Get position on oval
        const x = center - radiusX * Math.sin(angle);
        const y = center - radiusY * Math.cos(angle);

        // Apply position
        gsap.set(card, {
          x: x,
          y: y,
          xPercent: -50,
          yPercent: -50,
        });
      });

      // Update opacity after positions change
      updateOpacity();
    };

    // Function to update opacity based on card's position
    const updateOpacity = () => {
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      const startFadeY = windowHeight * 0.1;
      const visibilityThreshold = windowWidth * 1;
      const transitionZone = windowWidth * 0.2;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardY = rect.top;
        const cardX = rect.left + rect.width / 2;

        let opacity = 1;

        if (cardY < startFadeY) {
          opacity = 0.9 + (0.1 * cardY) / startFadeY;
        }

        if (cardX > visibilityThreshold - transitionZone) {
          const horizontalFactor = Math.max(
            0.3,
            1 -
              (cardX - (visibilityThreshold - transitionZone)) / transitionZone
          );
          opacity *= horizontalFactor;
        }

        // In the updateOpacity function, change the backdrop filter application:

        // Fix: Apply styles directly to the element instead of using GSAP for backdrop-filter
        if (opacity > 0) {
          gsap.set(card, {
            opacity: opacity,
            visibility: "visible",
          });

          // Apply backdrop-filter to the card itself instead of the container
          card.style.backdropFilter = "blur(20px)";
          if (isSafari) {
            // Use type assertion to bypass TypeScript's type checking for the vendor prefix
            (card.style as any).webkitBackdropFilter = "blur(20px)";
          }
        } else {
          gsap.set(card, {
            opacity: 0,
            visibility: "hidden",
          });
        }
      });
    };
    // Initial setup
    updateCardPositions();

    // Add resize event listener
    const handleResize = () => updateCardPositions(rotationAngleRef.current);
    window.addEventListener("resize", handleResize);

    // Add mouse events for clicking cards
    const handleMouseDown = () => {
      isClickingRef.current = true;
      clickStartTimeRef.current = performance.now();
    };

    window.addEventListener("mousedown", handleMouseDown);

    // Handle wheel event for moving cards along path
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const now = performance.now();
      const elapsed = now - lastTimeRef.current;
      lastTimeRef.current = now;

      // Get the raw delta for velocity calculation with direction explicitly preserved
      const sensitivity = 0.0003;

      // CHANGE: Reverse the sign of rawDelta to change rotation direction
      const rawDelta = -e.deltaY * sensitivity; // Added negative sign here

      // Force a sign to the rawDelta to ensure direction is preserved
      // CHANGE: Reverse the direction
      const scrollDirection = -Math.sign(e.deltaY); // Added negative sign here

      // Rest of your code remains the same
      if (elapsed > 0) {
        // Apply smoother damping
        velocityRef.current =
          0.85 * velocityRef.current + 0.15 * ((rawDelta / elapsed) * 16);

        // Ensure velocity has same sign as scroll direction
        if (
          Math.sign(velocityRef.current) !== scrollDirection &&
          scrollDirection !== 0
        ) {
          velocityRef.current = Math.abs(velocityRef.current) * scrollDirection;
        }
      }
      // Cancel any existing animation
      if (animationRef.current) {
        animationRef.current.kill();
      }

      // For small scrolls, don't apply immediate jump,
      // instead rely entirely on the animation
      const minScrollVelocity = 0.01;

      // Always use the original scroll direction for small scrolls
      if (Math.abs(velocityRef.current) < minScrollVelocity) {
        velocityRef.current = scrollDirection * minScrollVelocity;
      }

      // Log for debugging
      // console.log(
      //   "Direction:",
      //   scrollDirection,
      //   "Velocity:",
      //   velocityRef.current
      // );

      // Instead of direct update, animate to target position smoothly
      // Instead of direct update, animate to target position smoothly
      animationRef.current = gsap.to(
        {},
        {
          duration: 1.5, // Increased from 0.8 to 2.0 seconds
          ease: "power1.out", // Changed to a more gradual easing
          onUpdate: function () {
            const progress = this.progress();
            const decayFactor = 1 - Math.pow(progress, 0.7); // More gradual decay curve

            // Combined movement calculation with reduced decay
            const momentumDelta = velocityRef.current * decayFactor * 0.5;

            // Apply movement to rotation angle
            rotationAngleRef.current += momentumDelta;
            updateCardPositions(rotationAngleRef.current);
          },
          onComplete: function () {
            velocityRef.current *= 0.3; // Reduce less aggressively (was 0.5)
          },
        }
      );
    };

    // Add wheel event listener
    window.addEventListener("wheel", handleWheel, { passive: false });

    // Track touch events for mobile
    let touchStartY = 0;
    let lastTouchY = 0;
    let lastTouchTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      // Don't automatically skip card touches - instead track all touches
      // but only prevent default for non-card elements
      const isCardTouch = !!(e.target as HTMLElement).closest(".wheel__card");

      touchStartY = e.touches[0].clientY;
      lastTouchY = touchStartY;
      lastTouchTime = performance.now();

      // Kill any existing animations when user starts touching
      if (animationRef.current) {
        animationRef.current.kill();
      }

      // Only prevent default for non-card elements
      if (!isCardTouch) {
        e.preventDefault();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      // For touch moves, we want to process ALL moves, even on cards
      // but we need to be careful about preventing default
      const isCardTouch = !!(e.target as HTMLElement).closest(".wheel__card");

      // Only prevent default for non-card elements
      // This allows card touch interactions (like scrolling) to work naturally
      if (!isCardTouch) {
        e.preventDefault();
      }

      const touchY = e.touches[0].clientY;
      const now = performance.now();
      const elapsed = now - lastTouchTime;

      // Calculate delta and velocity
      const deltaY = lastTouchY - touchY;
      const sensitivity = 0.003;

      // CHANGE: Reverse the sign of rawDelta to change rotation direction
      const rawDelta = -deltaY * sensitivity;

      // Force a sign to the rawDelta to ensure direction is preserved
      const touchDirection = -Math.sign(deltaY);

      // Only update wheel position if the movement is significant
      // This helps distinguish between attempts to tap vs attempts to scroll
      if (Math.abs(deltaY) > 5) {
        if (elapsed > 0) {
          // Apply smoother damping (same as wheel handler)
          velocityRef.current =
            0.85 * velocityRef.current + 0.15 * ((rawDelta / elapsed) * 16);

          // Ensure velocity has same sign as touch direction
          if (
            Math.sign(velocityRef.current) !== touchDirection &&
            touchDirection !== 0
          ) {
            velocityRef.current =
              Math.abs(velocityRef.current) * touchDirection;
          }
        }

        lastTouchY = touchY;
        lastTouchTime = now;

        // Cancel any existing animation
        if (animationRef.current) {
          animationRef.current.kill();
        }

        // For small movements, don't apply immediate jump,
        // instead rely entirely on the animation
        const minTouchVelocity = 0.01;

        // Always use the original touch direction for small movements
        if (Math.abs(velocityRef.current) < minTouchVelocity) {
          velocityRef.current = touchDirection * minTouchVelocity;
        }

        // Start the animation to update the wheel position
        animationRef.current = gsap.to(
          {},
          {
            duration: 1.5,
            ease: "power1.out",
            onUpdate: function () {
              const progress = this.progress();
              const decayFactor = 1 - Math.pow(progress, 0.7);

              // Combined movement calculation with reduced decay
              const momentumDelta = velocityRef.current * decayFactor * 0.5;

              // Apply movement to rotation angle
              rotationAngleRef.current += momentumDelta;
              updateCardPositions(rotationAngleRef.current);
            },
            onComplete: function () {
              velocityRef.current *= 0.3;
            },
          }
        );
      }
    };

    const handleTouchEnd = () => {
      // We only need to handle touchend if no animation is running
      // If animation is already running from touchmove, we can let it continue
      if (!animationRef.current && Math.abs(velocityRef.current) > 0.0001) {
        animationRef.current = gsap.to(
          {},
          {
            duration: 1.5,
            ease: "power1.out",
            onUpdate: function () {
              const progress = this.progress();
              const decayFactor = 1 - Math.pow(progress, 0.7);
              const momentumDelta = velocityRef.current * decayFactor * 0.5;
              rotationAngleRef.current += momentumDelta;
              updateCardPositions(rotationAngleRef.current);
            },
            onComplete: function () {
              velocityRef.current *= 0.3;
            },
          }
        );
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []); // Empty dependency array - only run once

  return (
    <>
      <div className="header"></div>
      <section className="slider-section">
        <div className="wheel" ref={wheelRef}>
          {[...Array(16)].map((_, i) => {
            // Reverse the index to affect render order (and thus z-index)
            const index = 15 - i;
            // Get the title based on the original image (mod 8)
            const titleIndex = index % 8;
            const project = projects[titleIndex];

            return (
              <div
                className={`wheel__card card-${index % 8}`}
                key={index}
                onClick={() => handleCardClick(project.path)}
                onTouchStart={(e) => handleCardTouchStart(e)}
                onTouchEnd={(e) => handleCardTouchEnd(e, project.path)}
              >
                <div className="card-container">
                  <h3 className="card-title">{project.title}</h3>
                  <img src={portfolioImages[index % 16]} alt={project.title} />
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <motion.div
        ref={bubbleRef}
        className={`contact-bubble ${isContactExpanded ? "expanded" : ""}`}
        variants={bubbleVariants}
        initial="collapsed"
        animate={isContactExpanded ? "expanded" : "collapsed"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleBubbleClick}
        onTouchEnd={handleBubbleTouchEnd}
      >
        <h3 className="contact-title">Let's talk</h3>
        <AnimatePresence>
          <motion.div
            className="contact-content"
            // variants={contentVariants}
            initial="collapsed"
            animate={isContactExpanded ? "expanded" : "collapsed"}
          >
            <a
              href="mailto:wxintong.work@gmail.com"
              className="contact-email"
              onClick={(e) => {
                e.stopPropagation();
                // For mobile devices, explicitly handle the email link
                if (isMobile) {
                  window.location.href = "mailto:wxintong.work@gmail.com";
                }
              }}
              onTouchEnd={(e) => {
                e.stopPropagation();
                e.preventDefault();
                window.location.href = "mailto:wxintong.work@gmail.com";
              }}
            >
              wxintong.work@gmail.com
            </a>
            <div className="social-links">
              <a
                href="https://www.instagram.com/midpovs"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  // On mobile, directly navigate to the URL
                  if (isMobile) {
                    window.open("https://www.instagram.com/midpovs", "_blank");
                  }
                }}
                onTouchEnd={(e) => {
                  e.stopPropagation();
                  // Explicitly prevent the default touchend behavior and handle navigation manually
                  e.preventDefault();
                  window.open("https://www.instagram.com/midpovs", "_blank");
                }}
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/in/weexintong"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  if (isMobile) {
                    window.open(
                      "https://www.linkedin.com/in/weexintong",
                      "_blank"
                    );
                  }
                }}
                onTouchEnd={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  window.open(
                    "https://www.linkedin.com/in/weexintong",
                    "_blank"
                  );
                }}
              >
                LinkedIn
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="corner-text top-left">
        <a
          onClick={(e) => {
            e.preventDefault();
            onCardClick && onCardClick("about-me");
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onCardClick && onCardClick("about-me");
          }}
          href="#"
        >
          About me
        </a>
      </div>
      {/* <div className="corner-text bottom-left">Midpovs</div> */}

      {/* <div className="scroll-down">
        Scroll down
        <div className="arrow"></div>
      </div> */}
    </>
  );
};

export default ScrollTriggerCircularCards;
