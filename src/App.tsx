// import { useRef, useState, useEffect } from "react";
import ScrollTriggerCircularCards from "./ScrollTriggerCircularCards";
import PukulLima from "./Project Showcase/PukulLima";
import FindersKeepers from "./Project Showcase/FindersKeepers";
import DontWakeMeUp from "./Project Showcase/Don'tWakeMeUp";
import StreetPhotography from "./Project Showcase/StreetPhotography";
import StreetPhotographyTest from "./Project Showcase/StreetPhotographyTest";
import FashionPhotography from "./Project Showcase/FashionPhotography";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  // useLocation,
} from "react-router-dom";

// Modified MainContent to only show cards view
function MainContent() {
  // const location = useLocation();
  const navigate = useNavigate();

  // Handle card click from ScrollTriggerCircularCards
  const handleCardClick = (projectPath: string) => {
    navigate(`/project/${projectPath}`);
  };

  return (
    <div className="text-white h-screen overflow-y-auto">
      {/* Cards section */}
      <div className="h-screen w-full">
        <ScrollTriggerCircularCards onCardClick={handleCardClick} />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        {/* <Route path="/cards" element={<MainContent />} /> */}
        {/* Define routes for each project with its own component */}
        <Route path="/project/pukul-lima" element={<PukulLima />} />
        <Route path="/project/finders-keepers" element={<FindersKeepers />} />
        <Route path="/project/dont-wake-me-up" element={<DontWakeMeUp />} />
        <Route
          path="/project/street-photography"
          element={<StreetPhotography />}
        />
        <Route
          path="/project/street-photography-test"
          element={<StreetPhotographyTest />}
        />
        <Route
          path="/project/fashion-photography"
          element={<FashionPhotography />}
        />
        {/* Add fallback for other project paths */}
        <Route path="/project/:projectId" element={<PukulLima />} />
      </Routes>
    </Router>
  );
}

export default App;
