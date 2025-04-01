import { useState, useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import recordInner from "./assets/vinyl record/record_inner.png";
import recordOuter from "./assets/vinyl record/record_outer.png"; // Import the outer record image

const VinylSpinner = () => {
  // Change initial rotation value to -40 degrees
  const [rotation, setRotation] = useState(-40);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scale, setScale] = useState(6);
  const controls = useAnimationControls();
  const outerControls = useAnimationControls(); // Create separate controls for outer record

  // Add state to track if device is mobile
  const [isMobile, setIsMobile] = useState(false);

  // Track last update time to control animation frequency
  const lastUpdateTimeRef = useRef(Date.now());
  // Track target rotation for smooth animation - also set to -40
  const targetRotationRef = useRef(-40);
  // Track target scale for smooth resizing
  const targetScaleRef = useRef(6);
  // Track touch events for mobile
  const touchStartRef = useRef({ x: 0, y: 0 });
  const touchMoveRef = useRef({ x: 0, y: 0 });
  const isTouchingRef = useRef(false);

  // Define rotation limits
  const MIN_ROTATION = -40;
  const MAX_ROTATION = 360;

  // Add a ref to track mobile status
  const isMobileRef = useRef(false);

  // Check for mobile device on component mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;
      // console.log("Device detection:", isMobileDevice ? "Mobile" : "Desktop");

      // Update both the state and the ref
      setIsMobile(isMobileDevice);
      isMobileRef.current = isMobileDevice;
    };

    // Initial check
    checkIfMobile();

    // Add resize listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

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

      // Apply both rotation and scale to the animation controls (for inner record)
      controls.set({
        rotate: newRotation,
        scale: newScale,
      });

      // Apply ONLY scale to the outer record's controls
      outerControls.set({
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
  }, [rotation, scale, controls, outerControls]); // Add outerControls as dependency

  // Process wheel or touch movement with the same logic
  const processMovement = (deltaY: number) => {
    // Throttle updates (only process every 16ms - about 60fps)
    const now = Date.now();
    if (now - lastUpdateTimeRef.current < 16) {
      return;
    }
    lastUpdateTimeRef.current = now;

    // Calculate rotation delta based on direction and current position
    let rotationDelta = 0;

    // Only apply rotation in valid range
    if (
      (deltaY > 0 && targetRotationRef.current < MAX_ROTATION) ||
      (deltaY < 0 && targetRotationRef.current > MIN_ROTATION)
    ) {
      rotationDelta = deltaY * 0.3;
    }

    // Update scroll position (for debugging)
    setScrollPosition((prev) => prev + rotationDelta);

    // Update target rotation - with limits applied
    const newTargetRotation = targetRotationRef.current + rotationDelta;
    targetRotationRef.current = Math.max(
      MIN_ROTATION,
      Math.min(MAX_ROTATION, newTargetRotation)
    );

    // Update target scale based on direction and device type
    const scaleFactor = isMobileRef.current ? 0.0035 : 0.003; // Higher sensitivity for mobile
    // console.log(
    //   "Using scale factor:",
    //   scaleFactor,
    //   "for",
    //   isMobileRef.current ? "mobile" : "desktop"
    // );
    const scaleDelta = -deltaY * scaleFactor;

    // Limit the scale based on device type
    const minScale = isMobileRef.current ? 1.5 : 2; // Lower min scale for mobile
    // console.log("Using min scale:", minScale);
    targetScaleRef.current = Math.max(
      minScale,
      Math.min(6, targetScaleRef.current + scaleDelta)
    );
  };

  // Use wheel events for desktop and touch events for mobile
  useEffect(() => {
    // Prevent default scrolling
    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    // Handle mouse wheel events
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      processMovement(e.deltaY);
    };

    // Handle touch start
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
      touchMoveRef.current = { x: touch.clientX, y: touch.clientY };
      isTouchingRef.current = true;
    };

    // Handle touch move
    const handleTouchMove = (e: TouchEvent) => {
      if (!isTouchingRef.current) return;

      const touch = e.touches[0];
      touchMoveRef.current = { x: touch.clientX, y: touch.clientY };

      // Calculate the difference in Y position since the last frame
      const deltaY = touchStartRef.current.y - touch.clientY;

      // Process the touch movement with the same handler as wheel
      processMovement(deltaY * 2); // Multiply by 2 to make touch more sensitive

      // Update reference for next frame
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    // Handle touch end
    const handleTouchEnd = () => {
      isTouchingRef.current = false;
    };

    // Add event listeners for both wheel and touch
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchcancel", handleTouchEnd);

    // Prevent default scrolling
    document.body.style.overflow = "hidden";
    document.addEventListener("scroll", preventScroll, { passive: false });

    return () => {
      // Clean up all event listeners
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
      document.removeEventListener("scroll", preventScroll);
      document.body.style.overflow = "";
    };
  }, []); // No dependencies to prevent re-adding listeners

  return (
    <div className="h-screen w-screen flex items-center justify-center fixed inset-0 bg-[#1e1e1e] touch-none">
      {/* Debug info with more detailed information */}
      <div className="absolute top-4 left-4 text-white text-sm z-10 bg-black/50 p-2 rounded">
        <div>Wheel/Touch Delta: {scrollPosition.toFixed(1)}px</div>
        <div>Rotation: {rotation.toFixed(1)}°</div>
        <div>Scale: {scale.toFixed(2)}x</div>
        <div>Target: {targetRotationRef.current.toFixed(1)}°</div>
        <div>Device: {isMobile ? "Mobile" : "Desktop"}</div>
        <div>
          Limits: {MIN_ROTATION}° to {MAX_ROTATION}°
        </div>
      </div>

      <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
        {/* Record container with both inner and outer parts */}
        <div className="relative w-full h-full">
          {/* Outer record (non-spinning part) - scales but doesn't rotate */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            animate={outerControls}
            initial={{ scale: 6 }}
            transition={{ type: "tween", duration: 0.01 }}
          >
            <img
              src={recordOuter}
              alt="Vinyl Record Outer"
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Inner record (spinning part) - both scales and rotates */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            animate={controls}
            initial={{ rotate: -40, scale: 6 }}
            transition={{ type: "tween", duration: 0.01 }}
          >
            <img
              src={recordInner}
              alt="Vinyl Record Inner"
              className="w-full h-full object-contain"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VinylSpinner;
