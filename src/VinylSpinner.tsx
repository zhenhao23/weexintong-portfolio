import { useState, useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import recordInner from "./assets/record_inner.png";

const VinylSpinner = () => {
  // Change initial rotation value to -40 degrees
  const [rotation, setRotation] = useState(-40);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scale, setScale] = useState(6);
  const controls = useAnimationControls();

  // Track last update time to control animation frequency
  const lastUpdateTimeRef = useRef(Date.now());
  // Track target rotation for smooth animation - also set to -40
  const targetRotationRef = useRef(-40);
  // Track target scale for smooth resizing
  const targetScaleRef = useRef(6);

  // Define rotation limits
  const MIN_ROTATION = -40;
  const MAX_ROTATION = 360;

  // Smooth animation loop for both rotation and scale
  useEffect(() => {
    let animationFrameId: number;

    const animateToTarget = () => {
      // Calculate the current rotation to move toward target
      const currentRotation = rotation;
      const targetRotation = targetRotationRef.current;
      const newRotation =
        currentRotation + (targetRotation - currentRotation) * 0.05;

      // Calculate the current scale to move toward target
      const currentScale = scale;
      const targetScale = targetScaleRef.current;
      const newScale = currentScale + (targetScale - currentScale) * 0.05;

      // Update rotation if it's changed enough
      if (Math.abs(newRotation - rotation) > 0.01) {
        setRotation(newRotation);
      }

      // Update scale if it's changed enough
      if (Math.abs(newScale - scale) > 0.001) {
        setScale(newScale);
      }

      // Apply both rotation and scale to the animation controls
      controls.set({
        rotate: newRotation,
        scale: newScale,
      });

      animationFrameId = requestAnimationFrame(animateToTarget);
    };

    animationFrameId = requestAnimationFrame(animateToTarget);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [rotation, scale, controls]);

  // Use wheel events instead of scroll events
  useEffect(() => {
    // Prevent default scrolling
    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    // Handle mouse wheel events directly with throttling
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Throttle updates (only process every 16ms - about 60fps)
      const now = Date.now();
      if (now - lastUpdateTimeRef.current < 16) {
        return;
      }
      lastUpdateTimeRef.current = now;

      // Get the delta from the wheel event
      const wheelDelta = e.deltaY;

      // Calculate rotation delta based on wheel direction and current position
      let rotationDelta = 0;

      // Only apply rotation in valid range:
      // If scrolling down (deltaY > 0) and below max rotation, allow increase
      // If scrolling up (deltaY < 0) and above min rotation, allow decrease
      if (
        (wheelDelta > 0 && targetRotationRef.current < MAX_ROTATION) ||
        (wheelDelta < 0 && targetRotationRef.current > MIN_ROTATION)
      ) {
        rotationDelta = wheelDelta * 0.3;
      }

      // Update scroll position (for debugging)
      setScrollPosition((prev) => prev + rotationDelta);

      // Update target rotation - with limits applied
      const newTargetRotation = targetRotationRef.current + rotationDelta;
      targetRotationRef.current = Math.max(
        MIN_ROTATION,
        Math.min(MAX_ROTATION, newTargetRotation)
      );

      // Update target scale based on wheel direction
      const scaleDelta = -e.deltaY * 0.003; // Negative multiplier to reverse the effect

      // Limit the scale between 2 and 6
      targetScaleRef.current = Math.max(
        2,
        Math.min(6, targetScaleRef.current + scaleDelta)
      );
    };

    // Add wheel event listener
    window.addEventListener("wheel", handleWheel, { passive: false });

    // Prevent default scrolling
    document.body.style.overflow = "hidden";
    document.addEventListener("scroll", preventScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      document.removeEventListener("scroll", preventScroll);
      document.body.style.overflow = "";
    };
  }, []); // No dependencies to prevent re-adding listeners

  return (
    <div className="h-screen w-screen flex items-center justify-center fixed inset-0 bg-gray-900">
      {/* Debug info with more detailed information */}
      <div className="absolute top-4 left-4 text-white text-sm z-10 bg-black/50 p-2 rounded">
        <div>Wheel Delta: {scrollPosition.toFixed(1)}px</div>
        <div>Rotation: {rotation.toFixed(1)}°</div>
        <div>Scale: {scale.toFixed(2)}x</div>
        <div>Target: {targetRotationRef.current.toFixed(1)}°</div>
        <div>
          Limits: {MIN_ROTATION}° to {MAX_ROTATION}°
        </div>
      </div>

      <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
        {/* The spinning record with size changes */}
        <motion.div
          className="w-full h-full"
          animate={controls}
          initial={{ rotate: -40, scale: 6 }}
          transition={{ type: "spring", stiffness: 80, damping: 30 }}
        >
          <img
            src={recordInner}
            alt="Vinyl Record"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default VinylSpinner;
