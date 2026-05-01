import React, { useState, useEffect } from "react";
import "./ProjectShowcase.css";
import { useNavigate } from "react-router-dom";
import Masonry from "react-masonry-css";
import ContactBubble from "../components/ContactBubble";

import urban1 from "../assets/urban photography/urban1.jpg";
import urban2 from "../assets/urban photography/urban2.jpg";
import urban3 from "../assets/urban photography/urban3.jpg";
import urban4 from "../assets/urban photography/urban4.jpg";
import urban5 from "../assets/urban photography/urban5.jpg";
import urban6 from "../assets/urban photography/urban6.jpg";
import urban7 from "../assets/urban photography/urban7.jpg";
import urban8 from "../assets/urban photography/urban8.jpg";
import urban9 from "../assets/urban photography/urban9.jpg";
import urban10 from "../assets/urban photography/urban10.jpg";
import urban11 from "../assets/urban photography/urban11.jpg";
import urban12 from "../assets/urban photography/urban12.jpg";
import urban13 from "../assets/urban photography/urban13.jpg";
import urban14 from "../assets/urban photography/urban14.jpg";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const urbanImages = [
  { src: urban6, alt: "" },
  { src: urban4, alt: "" },
  { src: urban2, alt: "" },
  { src: urban3, alt: "" },
  { src: urban8, alt: "" },
  { src: urban5, alt: "" },
  { src: urban7, alt: "" },
  { src: urban11, alt: "" },
  { src: urban12, alt: "" },
  { src: urban10, alt: "" },
  { src: urban9, alt: "" },
  { src: urban13, alt: "" },
  { src: urban14, alt: "" },
  { src: urban1, alt: "" },
];

const UrbanPhotography: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const goToPrevImage = () =>
    setCurrentImageIndex((prev) => (prev === 0 ? urbanImages.length - 1 : prev - 1));

  const goToNextImage = () =>
    setCurrentImageIndex((prev) => (prev === urbanImages.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "ArrowLeft") goToPrevImage();
      else if (e.key === "ArrowRight") goToNextImage();
      else if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  return (
    <div className="project-showcase-container">
      <div className="corner-text top-left" onClick={() => navigate("/project/about-me")}>
        <a>About me</a>
      </div>
      <div className="centered-card-wrapper">
        <div className="centered-card">
          <div className="card-container">
            <div className="card-header">
              <div className="header-left">
                <span className="nav-button close-button" onClick={() => navigate("/")}>
                  [close]
                </span>
              </div>
              <div className="header-right">
                <span className="nav-button" onClick={() => navigate("/project/pukul-lima")}>
                  [previous]
                </span>
                <span className="nav-button" onClick={() => navigate("/project/fashion-photography")}>
                  [next]
                </span>
              </div>
            </div>
            <div className="content-container">
              <div className="photo-container">
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  {urbanImages.map((image, index) => (
                    <div
                      className="masonry-item"
                      key={index}
                      onClick={() => openLightbox(index)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="card-container">
                        <h3 className="card-title">&nbsp;</h3>
                        <img
                          src={image.src}
                          alt={image.alt}
                          loading="lazy"
                          style={{ width: "100%", display: "block", marginBottom: "0px" }}
                        />
                      </div>
                    </div>
                  ))}
                </Masonry>
              </div>
            </div>
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>×</button>
            <button className="lightbox-nav lightbox-prev" onClick={goToPrevImage}>‹</button>
            <div className="lightbox-content">
              <img
                src={urbanImages[currentImageIndex].src}
                alt={urbanImages[currentImageIndex].alt}
              />
              <p className="lightbox-caption">{urbanImages[currentImageIndex].alt}</p>
            </div>
            <button className="lightbox-nav lightbox-next" onClick={goToNextImage}>›</button>
          </div>
        </div>
      )}
      <ContactBubble />
    </div>
  );
};

export default UrbanPhotography;
