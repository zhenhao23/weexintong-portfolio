import { useEffect, useRef } from "react";

const LazyImage = ({ src, alt }: { src: string; alt: string }) => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && imgRef.current) {
          imgRef.current.src = src; // Load the image
          observer.disconnect(); // Stop observing once loaded
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  return <img ref={imgRef} alt={alt} />;
};

export default LazyImage;
