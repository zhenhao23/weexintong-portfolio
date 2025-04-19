// import { useRef, useState, useEffect } from "react";
import ScrollTriggerCircularCards from "./ScrollTriggerCircularCards";
import PukulLima from "./Project Showcase/PukulLima";
import FindersKeepers from "./Project Showcase/FindersKeepers";
import DontWakeMeUp from "./Project Showcase/Don'tWakeMeUp";
import StreetPhotography from "./Project Showcase/StreetPhotography";
import FashionPhotography from "./Project Showcase/FashionPhotography";
import WorkExperience from "./Project Showcase/WorkExperience";
import UrbanPhotography from "./Project Showcase/UrbanPhotography";
import AboutMe from "./Project Showcase/AboutMe";
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
          path="/project/fashion-photography"
          element={<FashionPhotography />}
        />
        <Route path="/project/work-experience" element={<WorkExperience />} />
        <Route
          path="/project/urban-photography"
          element={<UrbanPhotography />}
        />
        <Route path="/project/about-me" element={<AboutMe />} />
        {/* Add fallback for other project paths */}
        <Route path="/project/:projectId" element={<PukulLima />} />
      </Routes>
    </Router>
  );
}

export default App;
