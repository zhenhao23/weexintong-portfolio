import { useState, useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import recordInner from "./assets/vinyl record/record_inner.png";
import recordOuter from "./assets/vinyl record/record_outer.png";

// Add onReachLimit prop to component definition
interface VinylSpinnerProps {
  onReachLimit: () => void;
}

const VinylSpinner = ({ onReachLimit }: VinylSpinnerProps) => {
  const [rotation, setRotation] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scale, setScale] = useState(6);
  const controls = useAnimationControls();
  const outerControls = useAnimationControls();
  const [isMobile, setIsMobile] = useState(false);
  const lastUpdateTimeRef = useRef(Date.now());
  const targetRotationRef = useRef(-40);
  const targetScaleRef = useRef(6);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const touchMoveRef = useRef({ x: 0, y: 0 });
  const isTouchingRef = useRef(false);
  const hasReachedLimitRef = useRef(false); // Track if we've already triggered the transition
  const maxRotationReachedRef = useRef(false); // Track if max rotation has been reached
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeoutRef = useRef<number | null>(null);
  const animationCompleteRef = useRef(false);

  useEffect(() => {
    // Immediately set the initial position
    controls.set({ rotate: rotation, scale });
    outerControls.set({ scale });
  }, [controls, outerControls, rotation, scale]);

  // Define rotation limits
  const MIN_ROTATION = -40;
  const MAX_ROTATION = 360;

  // Define scale limits, but we won't use them for transition anymore
  // const MIN_SCALE = isMobile ? 1.5 : 2;

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

      // Update rotation if it's changed enough - use a slightly larger threshold
      if (Math.abs(newRotation - rotation) > 0.001) {
        setRotation(newRotation);
        animationCompleteRef.current = false;
      }

      // Update scale if it's changed enough - use a slightly larger threshold
      if (Math.abs(newScale - scale) > 0.0001) {
        setScale(newScale);
        animationCompleteRef.current = false;
      }

      // Check if animation has essentially completed - use bigger thresholds
      if (
        Math.abs(newRotation - targetRotation) < 0.1 &&
        Math.abs(newScale - targetScale) < 0.01
      ) {
        animationCompleteRef.current = true;
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
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      if (failSafeTimerRef.current) {
        clearTimeout(failSafeTimerRef.current);
      }
    };
  }, [rotation, scale, controls, outerControls]);

  // Add a fail-safe timer ref
  const failSafeTimerRef = useRef<number | null>(null);

  // Modify the processMovement function
  const processMovement = (deltaY: number) => {
    // Don't process movement during transition
    if (isTransitioning) {
      return;
    }

    // Throttle updates (only process every 16ms - about 60fps)
    const now = Date.now();
    if (now - lastUpdateTimeRef.current < 16) {
      return;
    }
    lastUpdateTimeRef.current = now;

    // Calculate rotation delta based on direction and current position
    let rotationDelta = 0;

    // Check if we've already hit max rotation
    if (targetRotationRef.current >= MAX_ROTATION) {
      maxRotationReachedRef.current = true;

      // Clear previous fail-safe timer if any
      if (failSafeTimerRef.current) {
        clearTimeout(failSafeTimerRef.current);
      }

      // Set a fail-safe timer to ensure transition happens after 1 second
      // if animation doesn't complete naturally
      if (!hasReachedLimitRef.current && !isTransitioning) {
        failSafeTimerRef.current = window.setTimeout(() => {
          if (!hasReachedLimitRef.current) {
            console.log("Fail-safe timer triggering transition"); // Debug log
            hasReachedLimitRef.current = true;
            setIsTransitioning(true);
            onReachLimit(); // This should trigger the snap scroll
          }
        }, 1000);
      }
    }

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
    const scaleFactor = isMobileRef.current ? 0.0035 : 0.003;
    const scaleDelta = -deltaY * scaleFactor;

    // Calculate the new target scale (we'll still use scaling animation)
    // const newTargetScale = targetScaleRef.current + scaleDelta;

    // Check if we should trigger the transition
    if (
      maxRotationReachedRef.current &&
      deltaY > 0 &&
      !hasReachedLimitRef.current &&
      (animationCompleteRef.current || Math.abs(rotation - MAX_ROTATION) < 1)
    ) {
      hasReachedLimitRef.current = true;
      setIsTransitioning(true); // Prevent further scrolling

      // Clear fail-safe timer if it was set
      if (failSafeTimerRef.current) {
        clearTimeout(failSafeTimerRef.current);
      }

      // Modify the transition to properly reset overflow before scrolling
      transitionTimeoutRef.current = window.setTimeout(() => {
        console.log("Triggering onReachLimit transition");
        // Explicitly reset overflow to allow scrolling before transition
        document.body.style.overflow = "auto";
        onReachLimit(); // This triggers the snap scroll to the next section
      }, 0);
    }

    const minScale = isMobileRef.current ? 1.5 : 2; // Lower min scale for mobile

    // Limit the scale (still apply scaling for visual effect)
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
        <div>
          Max Rotation Reached: {maxRotationReachedRef.current ? "Yes" : "No"}
        </div>
        <div>
          Animation Complete: {animationCompleteRef.current ? "Yes" : "No"}
        </div>
        <div>Transitioning: {isTransitioning ? "Yes" : "No"}</div>
      </div>

      {/* Add instructions for users */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
        <p className="text-lg">Scroll down to continue</p>
        <div className="mt-2 animate-bounce">↓</div>
      </div>

      {/* Record container - same as before */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
        <div className="relative w-full h-full">
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
