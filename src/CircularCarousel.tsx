import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

type CardProps = {
  id: number;
  content: React.ReactNode;
  background: string;
};

const CircularCarousel: React.FC = () => {
  // Sample cards data
  const cards: CardProps[] = [
    { id: 1, content: "Project 1", background: "bg-blue-400" },
    { id: 2, content: "Project 2", background: "bg-red-400" },
    { id: 3, content: "Project 3", background: "bg-green-400" },
    { id: 4, content: "Project 4", background: "bg-yellow-400" },
    { id: 5, content: "Project 5", background: "bg-purple-400" },
    { id: 6, content: "Project 6", background: "bg-pink-400" },
    { id: 7, content: "Project 7", background: "bg-indigo-400" },
    { id: 8, content: "Project 8", background: "bg-teal-400" },
    { id: 9, content: "Project 9", background: "bg-orange-400" },
    { id: 10, content: "Project 10", background: "bg-cyan-400" },
    { id: 11, content: "Project 11", background: "bg-rose-400" },
    { id: 12, content: "Project 12", background: "bg-slate-400" },
    { id: 13, content: "Project 13", background: "bg-emerald-400" },
    { id: 14, content: "Project 14", background: "bg-amber-400" },
    { id: 15, content: "Project 15", background: "bg-violet-400" },
  ];

  const [rotation, setRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Define oval dimensions - horizontal radius is larger than vertical radius
  const radiusX = 800; // Horizontal radius (longer)
  const radiusY = 400; // Vertical radius (shorter)

  const angleStep = (2 * Math.PI) / cards.length; // Angle between each card

  // Calculate card positions in an oval pattern
  const getCardPosition = (index: number, currentRotation: number) => {
    const angle = angleStep * index + currentRotation;

    // Use parametric equation for ellipse
    const x = radiusX * Math.cos(angle);
    const y = radiusY * Math.sin(angle);

    // Calculate scale factor based on y position for visual depth
    const scaleFactor = 0.85 + ((y + radiusY) / (2 * radiusY)) * 0.3;

    // Z-index based on y position
    const zIndex = Math.round((y + radiusY) * 100);

    return {
      x,
      y,
      scale: scaleFactor,
      zIndex,
      opacity: scaleFactor * 0.8 + 0.2, // Fade cards in the back slightly
    };
  };

  const handleScroll = (e: WheelEvent) => {
    // Determine rotation direction based on scroll
    const direction = e.deltaY > 0 ? 1 : -1;

    // Update rotation
    setRotation((prevRotation) => prevRotation + direction * 0.3);

    // Prevent default scrolling behavior
    e.preventDefault();
  };

  // Update card positions using GSAP
  useEffect(() => {
    cards.forEach((_, index) => {
      const card = cardRefs.current[index];
      if (card) {
        const { x, y, scale, zIndex, opacity } = getCardPosition(
          index,
          rotation
        );

        gsap.to(card, {
          x,
          y,
          scale,
          opacity,
          zIndex,
          duration: 0.8,
          ease: "power2.out",
        });
      }
    });
  }, [rotation]);

  // Use useEffect to add a non-passive wheel event listener
  useEffect(() => {
    const currentContainer = containerRef.current;

    if (currentContainer) {
      // Add the event listener with { passive: false } option
      currentContainer.addEventListener("wheel", handleScroll, {
        passive: false,
      });

      // Clean up the event listener on component unmount
      return () => {
        currentContainer.removeEventListener("wheel", handleScroll);
      };
    }
  }, [rotation]); // Re-add when rotation changes to capture the latest state

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-start overflow-hidden bg-black"
    >
      {/* The carousel container is positioned at the right edge */}
      <div
        className="relative h-full flex items-center justify-center"
        style={{
          transform: `translateX(50%) translateY(5%)`, // Move carousel partially out of view
          width: `${radiusX * 2}px`, // Set width to horizontal diameter
        }}
      >
        {cards.map((card, index) => {
          const { x, y, scale, zIndex } = getCardPosition(index, rotation);

          return (
            <div
              key={card.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`absolute cursor-pointer flex items-center justify-center
                      ${card.background} rounded-2xl shadow-lg text-white font-bold text-xl`}
              style={{
                width: "320px", // 4:3 aspect ratio (4 units wide)
                height: "240px", // 4:3 aspect ratio (3 units tall)
                zIndex: zIndex,
                transform: `translate(${x}px, ${y}px) scale(${scale})`,
                opacity: scale * 0.8 + 0.2,
              }}
              onClick={() => {
                // Rotate carousel to bring this card to the front
                setRotation(-angleStep * index);
              }}
            >
              {card.content}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CircularCarousel;
