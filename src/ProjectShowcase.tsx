import React from "react";
import backgroundImage from "./assets/portfolio pics/DWMU1.png";

const ProjectShowcase: React.FC = () => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">My Projects</h1>
        {/* Add your project content here */}
      </div>
    </div>
  );
};

export default ProjectShowcase;
