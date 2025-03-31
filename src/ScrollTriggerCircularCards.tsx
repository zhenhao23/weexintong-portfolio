import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollTriggerCircularCards.css";

// Import your portfolio images
// You can replace the placeholders with actual imports later
import photo1 from "./assets/portfolio pics/DWMU1.png";
import photo2 from "./assets/portfolio pics/DWMU2.png";
import photo3 from "./assets/portfolio pics/fashion1.jpg";
import photo4 from "./assets/portfolio pics/fashion2.jpg";
import photo5 from "./assets/portfolio pics/FK.png";
import photo6 from "./assets/portfolio pics/profile pic.jpg";
import photo7 from "./assets/portfolio pics/street1.jpg";
import photo8 from "./assets/portfolio pics/street2.jpg";
import photo9 from "./assets/portfolio pics/street3.jpg";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ScrollTriggerCircularCards = () => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const rotationAngleRef = useRef(0);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const velocityRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  // Create an array with all portfolio images, duplicated to get 18 items
  const portfolioImages = [
    photo1,
    photo2,
    photo3,
    photo4,
    photo5,
    photo6,
    photo7,
    photo8,
    photo9,
    photo1,
    photo2,
    photo3,
    photo4,
    photo5,
    photo6,
    photo7,
    photo8,
    photo9,
  ];

  useEffect(() => {
    // Get all card elements
    const wheel = wheelRef.current;
    const cards = gsap.utils.toArray<HTMLElement>(".wheel__card");
    const totalCards = cards.length;

    // Arrow animation
    gsap.to(".arrow", {
      y: 5,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });

    // Function to update card positions based on current rotation angle
    const updateCardPositions = (currentAngle = 0) => {
      if (!wheel) return;

      const center = wheel.offsetWidth / 2;
      const radiusX = wheel.offsetWidth / 2; // Wider horizontally
      const radiusY = wheel.offsetWidth / 4.5; // Shorter vertically
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
            0,
            1 -
              (cardX - (visibilityThreshold - transitionZone)) / transitionZone
          );
          opacity *= horizontalFactor;
        }

        gsap.set(card, {
          opacity: opacity,
        });
      });
    };

    // Initial setup
    updateCardPositions();

    // Add resize event listener
    const handleResize = () => updateCardPositions(rotationAngleRef.current);
    window.addEventListener("resize", handleResize);

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
      console.log(
        "Direction:",
        scrollDirection,
        "Velocity:",
        velocityRef.current
      );

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
      touchStartY = e.touches[0].clientY;
      lastTouchY = touchStartY;
      lastTouchTime = performance.now();

      // Kill any existing animations when user starts touching
      if (animationRef.current) {
        animationRef.current.kill();
      }

      e.preventDefault();
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touchY = e.touches[0].clientY;
      const now = performance.now();
      const elapsed = now - lastTouchTime;

      // Calculate delta and velocity (similar to wheel handler)
      const deltaY = lastTouchY - touchY;
      const sensitivity = 0.003;

      // CHANGE: Reverse the sign of rawDelta to change rotation direction
      const rawDelta = -deltaY * sensitivity; // Added negative sign here

      // Force a sign to the rawDelta to ensure direction is preserved
      // CHANGE: Reverse the direction
      const touchDirection = -Math.sign(deltaY); // Added negative sign here

      // Rest of your code remains the same
      if (elapsed > 0) {
        // Apply smoother damping (same as wheel handler)
        velocityRef.current =
          0.85 * velocityRef.current + 0.15 * ((rawDelta / elapsed) * 16);

        // Ensure velocity has same sign as touch direction
        if (
          Math.sign(velocityRef.current) !== touchDirection &&
          touchDirection !== 0
        ) {
          velocityRef.current = Math.abs(velocityRef.current) * touchDirection;
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

      // Instead of direct update, animate to target position smoothly - same as wheel handler
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
          {[...Array(18)].map((_, i) => {
            // Reverse the index to affect render order (and thus z-index)
            const index = 17 - i;
            // Get the title based on the original image (mod 9)
            const titleIndex = (index % 9) + 1;
            return (
              <div className="wheel__card" key={index}>
                <div className="card-container">
                  <h3 className="card-title">Project {titleIndex}</h3>
                  <img
                    src={portfolioImages[index % 18]}
                    alt={`Portfolio ${titleIndex}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="scroll-down">
        Scroll down
        <div className="arrow"></div>
      </div>
    </>
  );
};

export default ScrollTriggerCircularCards;
