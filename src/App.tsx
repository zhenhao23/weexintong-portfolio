import { useRef, useState, useEffect } from "react";
import VinylSpinner from "./VinylSpinner";
import ScrollTriggerCircularCards from "./ScrollTriggerCircularCards";

function App() {
  // State to track which view is active
  const [currentView, setCurrentView] = useState<"vinyl" | "cards">("vinyl");
  const cardsRef = useRef<HTMLDivElement>(null);

  // Function to transition to the cards view
  const transitionToCards = () => {
    console.log("transitionToCards called");
    setCurrentView("cards");

    // Use setTimeout to ensure state update completes before scrolling
    setTimeout(() => {
      console.log("Attempting to scroll to cards section");

      // Try multiple approaches to ensure scrolling works
      if (cardsRef.current) {
        console.log("Cards ref exists, scrolling into view");
        cardsRef.current.scrollIntoView({ behavior: "smooth" });
      } else {
        console.log("Cards ref not found, using window.scrollTo");
        window.scrollTo({
          top: window.innerHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  // Debug - log when ref changes
  useEffect(() => {
    console.log("Cards ref:", cardsRef.current);
  }, [cardsRef.current]);

  return (
    <div className="text-white h-screen overflow-y-auto">
      {/* Main content container */}
      <div className="relative w-full">
        {/* Vinyl spinner section - always render but conditionally show/hide */}
        <div
          className={`${
            currentView === "cards"
              ? "pointer-events-none opacity-0"
              : "opacity-100"
          } h-screen w-full transition-opacity duration-500`}
        >
          <VinylSpinner onReachLimit={transitionToCards} />
        </div>

        {/* Cards section - positioned below the first viewport */}
        <div
          ref={cardsRef}
          id="cards-section"
          className={`${
            currentView === "vinyl" ? "opacity-0" : "opacity-100"
          } h-screen w-full transition-opacity duration-500`}
        >
          <ScrollTriggerCircularCards />
        </div>
      </div>
    </div>
  );
}

export default App;
