import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollTriggerCircularCards.css";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ScrollTriggerCircularCards = () => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const [wheelRotation, setWheelRotation] = useState(0);
  const scrollRef = useRef<number>(0);

  useEffect(() => {
    // Get all card elements
    const wheel = wheelRef.current;
    const images = gsap.utils.toArray<HTMLElement>(".wheel__card");

    // Arrow animation
    gsap.to(".arrow", {
      y: 5,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });

    // Setup function to position cards in a circle
    const setup = () => {
      if (!wheel) return;

      const radius = wheel.offsetWidth / 4;
      const center = wheel.offsetWidth / 2;
      const total = images.length;
      const slice = (2 * Math.PI) / total;

      images.forEach((item, i) => {
        const angle = i * slice;

        // Flip the circle horizontally by inverting the sin component
        const x = center - radius * Math.sin(angle); // Changed from + to -
        const y = center - radius * Math.cos(angle);

        gsap.set(item, {
          // Position cards in a circle but keep them upright
          x: x,
          y: y,
          xPercent: -50,
          yPercent: -50,
        });
      });
    };

    // Function to update opacity based on card's position with smooth transition
    const updateOpacity = () => {
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      const startFadeY = windowHeight * 0.2; // 20% of screen height
      const visibilityThreshold = windowWidth * 0.6; // 60% from the left is visible
      const transitionZone = windowWidth * 0.1; // 10% transition zone for smooth fading

      images.forEach((card) => {
        // Get card's absolute position in the viewport
        const rect = card.getBoundingClientRect();
        const cardY = rect.top;
        const cardX = rect.left + rect.width / 2; // Center X of the card

        // Calculate opacity based on vertical position
        let opacity = 1;

        // If card is above the startFadeY mark, decrease opacity
        if (cardY < startFadeY) {
          // Linear interpolation: 1 at startFadeY, 0.3 at top of screen (0)
          opacity = 0.3 + (0.7 * cardY) / startFadeY;
        }

        // If card is approaching or beyond the visibility threshold
        if (cardX > visibilityThreshold - transitionZone) {
          // Create a smooth transition from visible to invisible
          const horizontalFactor = Math.max(
            0,
            1 -
              (cardX - (visibilityThreshold - transitionZone)) / transitionZone
          );
          opacity *= horizontalFactor;
        }

        // Apply the calculated opacity
        gsap.set(card, {
          opacity: opacity,
        });
      });
    };

    // Initial setup
    setup();
    updateOpacity();

    // Add resize event listener
    window.addEventListener("resize", setup);

    // Handle wheel event for infinite scrolling
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Adjust sensitivity as needed
      const sensitivity = 0.2;
      const delta = e.deltaY * sensitivity;

      // Update scroll reference
      scrollRef.current += delta;

      // Update wheel rotation (normalized between 0-360 for easier handling)
      const newRotation = (wheelRotation - delta) % 360;
      setWheelRotation(newRotation);

      // Directly apply rotation to the wheel element
      if (wheel) {
        gsap.to(wheel, {
          rotation: scrollRef.current,
          duration: 0.5,
          ease: "power1.out",
          onUpdate: () => {
            // Counter-rotate each card to keep them upright
            const currentRotation = gsap.getProperty(wheel, "rotation");
            images.forEach((card) => {
              gsap.set(card, {
                rotation: -currentRotation,
              });
            });
            // Update opacity based on new positions
            updateOpacity();
          },
        });
      }
    };

    // Add wheel event listener for infinite scrolling
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
      const sensitivity = 0.8;
      const delta = deltaY * sensitivity;

      scrollRef.current += delta;

      const newRotation = (wheelRotation - delta) % 360;
      setWheelRotation(newRotation);

      if (wheel) {
        gsap.to(wheel, {
          rotation: scrollRef.current,
          duration: 0,
          ease: "power1.out",
          onUpdate: () => {
            const currentRotation = gsap.getProperty(wheel, "rotation");
            images.forEach((card) => {
              gsap.set(card, {
                rotation: -currentRotation,
              });
            });
            // Update opacity based on new positions
            updateOpacity();
          },
        });
      }

      touchStartY = touchY;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    // Cleanup
    return () => {
      window.removeEventListener("resize", setup);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [wheelRotation]);

  return (
    <>
      <div className="header">{/* <h1>Spinny Flipz</h1> */}</div>
      <section className="slider-section">
        <div className="wheel" ref={wheelRef}>
          {/* Create repeated cards in reverse order */}
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
