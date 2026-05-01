import React, { useState, useEffect } from "react";
import "./ProjectShowcase.css";
import { useNavigate } from "react-router-dom";
import Masonry from "react-masonry-css";
import ContactBubble from "../components/ContactBubble";

import fashion1 from "../assets/portfolio pics/fashion1.jpg";
import fashion2 from "../assets/portfolio pics/fashion2.jpg";
import fashion3 from "../assets/portfolio pics/fashion3.jpg";
import fashion4 from "../assets/portfolio pics/fashion4.jpg";

const breakpointColumnsObj = {
  default: 3,
  900: 2,
  600: 1,
};

const fashionImages = [
  { src: fashion3, alt: "" },
  { src: fashion1, alt: "" },
  { src: fashion4, alt: "" },
  { src: fashion2, alt: "" },
];

const FashionPhotography: React.FC = () => {
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
    setCurrentImageIndex((prev) => (prev === 0 ? fashionImages.length - 1 : prev - 1));

  const goToNextImage = () =>
    setCurrentImageIndex((prev) => (prev === fashionImages.length - 1 ? 0 : prev + 1));

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
                <span className="nav-button" onClick={() => navigate("/project/urban-photography")}>
                  [previous]
                </span>
                <span className="nav-button" onClick={() => navigate("/project/finders-keepers")}>
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
                  {fashionImages.map((image, index) => (
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
                src={fashionImages[currentImageIndex].src}
                alt={fashionImages[currentImageIndex].alt}
              />
              <p className="lightbox-caption">{fashionImages[currentImageIndex].alt}</p>
            </div>
            <button className="lightbox-nav lightbox-next" onClick={goToNextImage}>›</button>
          </div>
        </div>
      )}
      <ContactBubble />
    </div>
  );
};

export default FashionPhotography;
