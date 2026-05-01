import React, { useState, useEffect } from "react";
import "./ProjectShowcase.css";
import { useNavigate } from "react-router-dom";
import Masonry from "react-masonry-css";
import ContactBubble from "../components/ContactBubble";

import street1 from "../assets/portfolio pics/street1.jpg";
import street2 from "../assets/portfolio pics/street2.jpg";
import street3 from "../assets/portfolio pics/street3.jpg";
import street4 from "../assets/portfolio pics/street4.jpg";
import street5 from "../assets/portfolio pics/street5.jpg";
import street6 from "../assets/portfolio pics/street6.jpg";
import street7 from "../assets/portfolio pics/street7.jpg";
import street8 from "../assets/portfolio pics/street8.jpg";
import street9 from "../assets/portfolio pics/street9.jpg";
import street10 from "../assets/portfolio pics/street10.jpg";
import street11 from "../assets/portfolio pics/street11.jpg";
import street12 from "../assets/portfolio pics/street12.jpg";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const streetImages = [
  { src: street1, alt: "" },
  { src: street4, alt: "" },
  { src: street2, alt: "" },
  { src: street3, alt: "" },
  { src: street8, alt: "" },
  { src: street5, alt: "" },
  { src: street7, alt: "" },
  { src: street6, alt: "" },
  { src: street11, alt: "" },
  { src: street12, alt: "" },
  { src: street10, alt: "" },
  { src: street9, alt: "" },
];

const StreetPhotography: React.FC = () => {
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
    setCurrentImageIndex((prev) => (prev === 0 ? streetImages.length - 1 : prev - 1));

  const goToNextImage = () =>
    setCurrentImageIndex((prev) => (prev === streetImages.length - 1 ? 0 : prev + 1));

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
                <span className="nav-button" onClick={() => navigate("/project/work-experience")}>
                  [previous]
                </span>
                <span className="nav-button" onClick={() => navigate("/project/pukul-lima")}>
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
                  {streetImages.map((image, index) => (
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
                src={streetImages[currentImageIndex].src}
                alt={streetImages[currentImageIndex].alt}
              />
              <p className="lightbox-caption">{streetImages[currentImageIndex].alt}</p>
            </div>
            <button className="lightbox-nav lightbox-next" onClick={goToNextImage}>›</button>
          </div>
        </div>
      )}
      <ContactBubble />
    </div>
  );
};

export default StreetPhotography;
