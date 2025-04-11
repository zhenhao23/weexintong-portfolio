// import { useRef, useState, useEffect } from "react";
import ProjectShowcase from "./ProjectShowcase";

function App() {
  return (
    <>
      <ProjectShowcase />
    </>
  );
}

export default App;

// import { useRef, useState, useEffect } from "react";
// import VinylSpinner from "./VinylSpinner";
// import ScrollTriggerCircularCards from "./ScrollTriggerCircularCards";

// function App() {
//   const [currentView, setCurrentView] = useState<"vinyl" | "cards">("vinyl");
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const cardsRef = useRef<HTMLDivElement>(null);
//   const transitionRef = useRef<HTMLDivElement>(null);

//   const transitionToCards = () => {
//     console.log("transitionToCards called");
//     setIsTransitioning(true);

//     // Start the transition animation
//     if (transitionRef.current) {
//       transitionRef.current.classList.add("transition-active");
//     }

//     // After animation starts, update view
//     setTimeout(() => {
//       setCurrentView("cards");

//       // After view updates, scroll to cards
//       setTimeout(() => {
//         if (cardsRef.current) {
//           cardsRef.current.scrollIntoView({ behavior: "smooth" });
//         } else {
//           window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
//         }

//         // End transition after everything is in place
//         setTimeout(() => {
//           setIsTransitioning(false);
//           if (transitionRef.current) {
//             transitionRef.current.classList.remove("transition-active");
//           }
//         }, 500);
//       }, 100);
//     }, 500);
//   };

//   useEffect(() => {
//     console.log("Cards ref:", cardsRef.current);
//   }, [cardsRef.current]);

//   return (
//     <div className="text-white h-screen overflow-y-auto">
//       {/* Radial transition overlay */}
//       <div
//         ref={transitionRef}
//         className="fixed inset-0 z-50 pointer-events-none transition-radial"
//       ></div>

//       {/* Main content container */}
//       <div className="relative w-full">
//         {/* Vinyl spinner section */}
//         <div
//           className={`${
//             currentView === "cards" || isTransitioning
//               ? "pointer-events-none opacity-0"
//               : "opacity-100"
//           } h-screen w-full transition-opacity duration-500 absolute inset-0`}
//         >
//           <VinylSpinner onReachLimit={transitionToCards} />
//         </div>

//         {/* Cards section */}
//         <div
//           ref={cardsRef}
//           id="cards-section"
//           className={`${
//             currentView === "vinyl" ? "opacity-0" : "opacity-100"
//           } h-screen w-full transition-opacity duration-500`}
//         >
//           <ScrollTriggerCircularCards />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
