import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollTriggerCircularCards.css";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ScrollTriggerCircularCards = () => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const scrollRef = useRef<number>(0);

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
      const radiusX = wheel.offsetWidth / 3; // Wider horizontally
      const radiusY = wheel.offsetWidth / 5; // Shorter vertically
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
          // No rotation needed here - cards stay upright naturally
        });
      });

      // Update opacity after positions change
      updateOpacity();
    };

    // Function to update opacity based on card's position
    const updateOpacity = () => {
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      const startFadeY = windowHeight * 0.2;
      const visibilityThreshold = windowWidth * 0.6;
      const transitionZone = windowWidth * 0.1;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardY = rect.top;
        const cardX = rect.left + rect.width / 2;

        let opacity = 1;

        if (cardY < startFadeY) {
          opacity = 0.3 + (0.7 * cardY) / startFadeY;
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
    const handleResize = () => updateCardPositions(rotationAngle);
    window.addEventListener("resize", handleResize);

    // Handle wheel event for moving cards along path
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Adjust sensitivity as needed
      const sensitivity = 0.005; // Smaller value for smoother motion
      const delta = e.deltaY * sensitivity;

      // Update scroll reference
      scrollRef.current += delta;

      // Calculate new angle (in radians)
      const newAngle = rotationAngle + delta;
      setRotationAngle(newAngle);

      // Animate cards to new positions
      gsap.to(
        {},
        {
          duration: 0.5,
          ease: "power1.out",
          onUpdate: function () {
            // Get interpolated value between old and new angle
            const progress = this.progress();
            const currentAngle = rotationAngle + delta * progress;

            // Update card positions with the interpolated angle
            updateCardPositions(currentAngle);
          },
        }
      );
    };

    // Add wheel event listener
    window.addEventListener("wheel", handleWheel, { passive: false });

    // Track touch events for mobile
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      e.preventDefault();
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      // Similar to wheel event handling
      const sensitivity = 0.01;
      const delta = deltaY * sensitivity;

      // Update angle
      const newAngle = rotationAngle + delta;
      setRotationAngle(newAngle);

      // Animate cards to new positions
      gsap.to(
        {},
        {
          duration: 0.2,
          ease: "power1.out",
          onUpdate: function () {
            const progress = this.progress();
            const currentAngle = rotationAngle + delta * progress;
            updateCardPositions(currentAngle);
          },
        }
      );

      touchStartY = touchY;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [rotationAngle]);

  return (
    <>
      <div className="header"></div>
      <section className="slider-section">
        <div className="wheel" ref={wheelRef}>
          {[...Array(21)].map((_, i) => {
            // Reverse the index to affect render order (and thus z-index)
            const index = 20 - i;
            return (
              <div className="wheel__card" key={index}>
                <img
                  src={`https://assets.codepen.io/756881/amys-${
                    (index % 7) + 1
                  }.jpg`}
                  alt={`Card ${index + 1}`}
                />
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
