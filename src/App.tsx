import ScrollTriggerCircularCards from "./ScrollTriggerCircularCards";
import PukulLima from "./projects/PukulLima";
import FindersKeepers from "./projects/FindersKeepers";
import DontWakeMeUp from "./projects/DontWakeMeUp";
import StreetPhotography from "./projects/StreetPhotography";
import FashionPhotography from "./projects/FashionPhotography";
import WorkExperience from "./projects/WorkExperience";
import UrbanPhotography from "./projects/UrbanPhotography";
import AboutMe from "./projects/AboutMe";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

function MainContent() {
  const navigate = useNavigate();

  const handleCardClick = (projectPath: string) => {
    navigate(`/project/${projectPath}`);
  };

  return (
    <div className="text-white h-screen overflow-y-auto">
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
        <Route path="/project/pukul-lima" element={<PukulLima />} />
        <Route path="/project/finders-keepers" element={<FindersKeepers />} />
        <Route path="/project/dont-wake-me-up" element={<DontWakeMeUp />} />
        <Route path="/project/street-photography" element={<StreetPhotography />} />
        <Route path="/project/fashion-photography" element={<FashionPhotography />} />
        <Route path="/project/work-experience" element={<WorkExperience />} />
        <Route path="/project/urban-photography" element={<UrbanPhotography />} />
        <Route path="/project/about-me" element={<AboutMe />} />
        <Route path="/project/:projectId" element={<PukulLima />} />
      </Routes>
    </Router>
  );
}

export default App;
