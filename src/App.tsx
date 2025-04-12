import { useRef, useState, useEffect } from "react";
import VinylSpinner from "./VinylSpinner";
import ScrollTriggerCircularCards from "./ScrollTriggerCircularCards";
import PukulLima from "./Project Showcase/PukulLima";
import FindersKeepers from "./Project Showcase/FindersKeepers";
import DontWakeMeUp from "./Project Showcase/Don'tWakeMeUp";
// import CustomCursor from "./CustomCursor";
// import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

// Create a MainContent component to use navigation hooks
function MainContent() {
  // Initialize currentView based on the current path
  const location = useLocation();
  const initialView =
    location.pathname === "/cards" || location.pathname.startsWith("/project/")
      ? "cards"
      : "vinyl";

  const [currentView, setCurrentView] = useState<"vinyl" | "cards">(
    initialView
  );
  // const [isTransitioning, setIsTransitioning] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Keep view in sync with URL changes
  useEffect(() => {
    if (
      location.pathname === "/cards" ||
      location.pathname.startsWith("/project/")
    ) {
      // Skip transition animation when navigating between cards and projects
      setCurrentView("cards");
    } else if (location.pathname === "/") {
      // Only reset to vinyl view if explicitly navigating to home
      setCurrentView("vinyl");
    }
  }, [location.pathname]);

  // Handle card click from ScrollTriggerCircularCards
  const handleCardClick = (projectPath: string) => {
    navigate(`/project/${projectPath}`);
  };

  const transitionToCards = () => {
    console.log("transitionToCards called");
    // setIsTransitioning(true);

    // Start the transition animation
    if (transitionRef.current) {
      transitionRef.current.classList.add("transition-active");
    }

    // After animation starts, update view
    setTimeout(() => {
      setCurrentView("cards");
      navigate("/cards");

      // After view updates, scroll to cards
      setTimeout(() => {
        if (cardsRef.current) {
          cardsRef.current.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
        }

        // End transition after everything is in place
        setTimeout(() => {
          // setIsTransitioning(false);
          if (transitionRef.current) {
            transitionRef.current.classList.remove("transition-active");
          }
        }, 500);
      }, 100);
    }, 500);
  };

  return (
    <div className="text-white h-screen overflow-y-auto">
      {/* <CustomCursor /> */}
      {/* Radial transition overlay */}
      <div
        ref={transitionRef}
        className="fixed inset-0 z-50 pointer-events-none transition-radial"
      ></div>

      {/* Main content container */}
      <div className="relative w-full">
        {/* Vinyl spinner section */}
        <div
          className={`${
            currentView === "cards"
              ? "pointer-events-none opacity-0"
              : "opacity-100"
          } h-screen w-full transition-opacity duration-500 absolute inset-0`}
        >
          <VinylSpinner onReachLimit={transitionToCards} />
        </div>

        {/* Cards section */}
        <div
          ref={cardsRef}
          id="cards-section"
          className={`${
            currentView === "vinyl"
              ? "opacity-0 pointer-events-none"
              : "opacity-100"
          } h-screen w-full transition-opacity duration-500`}
        >
          <ScrollTriggerCircularCards onCardClick={handleCardClick} />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/cards" element={<MainContent />} />
        {/* Define routes for each project with its own component */}
        <Route path="/project/pukul-lima" element={<PukulLima />} />
        <Route path="/project/finders-keepers" element={<FindersKeepers />} />
        <Route path="/project/dont-wake-me-up" element={<DontWakeMeUp />} />
        {/* Add fallback for other project paths */}
        <Route path="/project/:projectId" element={<PukulLima />} />
      </Routes>
    </Router>
  );
}

export default App;
